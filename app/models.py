from datetime import datetime, timezone

from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db, login_manager


def utcnow():
    """Naive UTC timestamp; datetime.utcnow() is deprecated from Python 3.12."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Visitor(db.Model):
    """One row per distinct person.

    Keyed by a salted hash of IP + user agent, never the raw address, so we can
    tell people apart without storing anything that identifies them.
    """
    hash = db.Column(db.String(32), primary_key=True)
    first_seen = db.Column(db.DateTime, nullable=False, default=utcnow)
    last_seen = db.Column(db.DateTime, nullable=False, default=utcnow, index=True)
    hits = db.Column(db.Integer, nullable=False, default=1)

    def __repr__(self):
        return '<Visitor {} hits={}>'.format(self.hash[:8], self.hits)


class DailyStat(db.Model):
    """Per-day rollup, so the dashboard never has to scan the visitor table."""
    day = db.Column(db.Date, primary_key=True)
    pageviews = db.Column(db.Integer, nullable=False, default=0)
    uniques = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return '<DailyStat {} uniques={}>'.format(self.day, self.uniques)
