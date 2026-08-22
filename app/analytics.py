"""Privacy-preserving visitor counting.

The previous counter incremented a text file on every request to '/', which
meant crawlers, uptime monitors and page refreshes all inflated the number.
This module instead identifies each visitor by a salted, truncated hash of
their IP and user agent -- the raw address is never stored -- so refreshes
collapse into one visitor and obvious machine traffic is skipped entirely.
"""
import hashlib
import logging
import re
from flask import request

from .extensions import db
from .models import DailyStat, Visitor, utcnow

log = logging.getLogger(__name__)

# Crawlers, scanners and monitors. The nginx logs for this host are dominated
# by .php vulnerability scans and uptime pollers; none of them are visitors.
_BOT_RE = re.compile(
    r'bot|crawl|spider|slurp|scan|search|curl|wget|python-requests|httpx|'
    r'aiohttp|okhttp|java/|go-http|libwww|perl|ruby|axios|node-fetch|'
    r'headless|phantom|selenium|puppeteer|playwright|lighthouse|'
    r'monitor|uptime|pingdom|probe|preview|validator|archiver|facebookexternalhit',
    re.I,
)


def _is_bot(user_agent):
    # A request with no user agent at all is a scanner, not a person.
    return not user_agent or bool(_BOT_RE.search(user_agent))


def _visitor_hash(salt):
    ip = request.remote_addr or ''
    ua = request.user_agent.string or ''
    return hashlib.sha256('{}|{}|{}'.format(salt, ip, ua).encode()).hexdigest()[:32]


def _should_count(response):
    """Only count a real person successfully loading a real page."""
    if request.method != 'GET':
        return False
    if request.endpoint in (None, 'static'):
        return False
    # A 404 means a scanner probing /wp-login.php, not a visit.
    if response.status_code >= 400:
        return False
    if response.mimetype != 'text/html':
        return False
    return not _is_bot(request.user_agent.string)


def _record(salt):
    now = utcnow()
    today = now.date()

    visitor = db.session.get(Visitor, _visitor_hash(salt))
    if visitor is None:
        db.session.add(Visitor(hash=_visitor_hash(salt), first_seen=now, last_seen=now, hits=1))
        new_today = True
    else:
        # Already counted today? Then this is a refresh, not a new visitor.
        new_today = visitor.last_seen.date() < today
        visitor.last_seen = now
        visitor.hits += 1

    stat = db.session.get(DailyStat, today)
    if stat is None:
        stat = DailyStat(day=today, pageviews=0, uniques=0)
        db.session.add(stat)
    stat.pageviews += 1
    if new_today:
        stat.uniques += 1

    db.session.commit()


def init_analytics(app):
    salt = app.config['ANALYTICS_SALT']

    @app.after_request
    def _count_visit(response):
        try:
            if _should_count(response):
                _record(salt)
        except Exception:
            # Analytics must never take down a page render. This is exactly
            # how the old counter turned a corrupt text file into a 500.
            db.session.rollback()
            log.exception('visitor tracking failed')
        return response

    return app
