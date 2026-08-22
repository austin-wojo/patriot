import os


class Config:
    # No default value on purpose: a key committed to git is a key that
    # everyone who can read the repo already has. When this is unset,
    # create_app() falls back to a random key persisted under instance/.
    SECRET_KEY = os.environ.get('SECRET_KEY')

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # nginx terminates TLS in front of us.
    PREFERRED_URL_SCHEME = 'https'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    # Set SESSION_COOKIE_SECURE=false to develop over plain http locally.
    SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE', 'true').lower() != 'false'
