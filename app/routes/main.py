import os
from datetime import datetime, timedelta

from flask import Blueprint, render_template
from sqlalchemy import func

from ..extensions import db
from ..models import DailyStat, Visitor, utcnow

main = Blueprint('main', __name__)

# Raw hit count from the old text-file counter, kept only so the historical
# number is not lost. It counted bots and refreshes, so it is not comparable
# to the visitor figures below and is labelled as such on the dashboard.
_LEGACY_COUNTER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    'counter.txt',
)

CHART_DAYS = 30


def _legacy_hits():
    try:
        with open(_LEGACY_COUNTER) as handle:
            return int(handle.read().strip() or 0)
    except (OSError, ValueError):
        return 0


@main.route('/')
def index():
    """Render the homepage."""
    return render_template('main/index.html')


@main.route('/counter')
def counter():
    """Visitor statistics, for showing the client how the site is performing."""
    now = utcnow()
    today = now.date()

    totals = {
        'visitors': db.session.query(func.count(Visitor.hash)).scalar() or 0,
        'pageviews': db.session.query(func.coalesce(func.sum(DailyStat.pageviews), 0)).scalar(),
        'legacy_hits': _legacy_hits(),
    }

    def active_since(days):
        cutoff = now - timedelta(days=days)
        return db.session.query(func.count(Visitor.hash)).filter(Visitor.last_seen >= cutoff).scalar() or 0

    today_stat = db.session.get(DailyStat, today)
    summary = {
        'today': today_stat.uniques if today_stat else 0,
        'last_7': active_since(7),
        'last_30': active_since(30),
        'new_today': db.session.query(func.count(Visitor.hash))
                       .filter(Visitor.first_seen >= datetime.combine(today, datetime.min.time()))
                       .scalar() or 0,
    }

    # Fill gaps so the chart shows quiet days instead of skipping them.
    start = today - timedelta(days=CHART_DAYS - 1)
    recorded = {
        row.day: row
        for row in db.session.query(DailyStat).filter(DailyStat.day >= start).all()
    }
    series = []
    for offset in range(CHART_DAYS):
        day = start + timedelta(days=offset)
        row = recorded.get(day)
        series.append({
            'day': day,
            'uniques': row.uniques if row else 0,
            'pageviews': row.pageviews if row else 0,
        })
    peak = max([point['uniques'] for point in series] + [1])

    return render_template(
        'main/counter.html',
        totals=totals,
        summary=summary,
        series=series,
        peak=peak,
        generated_at=now,
    )
