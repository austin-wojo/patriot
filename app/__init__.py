import logging
import os
import secrets
import sys

from dotenv import load_dotenv
from flask import Flask, render_template
from werkzeug.middleware.proxy_fix import ProxyFix

from config import Config
from .extensions import db, login_manager, migrate

load_dotenv()  # Take environment variables from .env.

login_manager.login_view = 'auth.login'
login_manager.login_message_category = 'info'


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # nginx terminates TLS and proxies over a unix socket, so without this the
    # client IP is empty and every visitor hashes to the same value.
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)

    os.makedirs(app.instance_path, exist_ok=True)
    _configure_logging(app)

    app.config['SECRET_KEY'] = _persisted_secret(app, 'secret_key', app.config.get('SECRET_KEY'))
    # Deliberately separate from SECRET_KEY: rotating the session key should
    # not silently reset every visitor hash and double-count the audience.
    app.config['ANALYTICS_SALT'] = _persisted_secret(
        app, 'analytics_salt', os.environ.get('ANALYTICS_SALT')
    )

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    from . import models  # noqa: F401  -- register tables before create_all()
    from .analytics import init_analytics
    from .routes import register_blueprints

    init_analytics(app)
    register_blueprints(app)
    _register_error_handlers(app)

    with app.app_context():
        db.create_all()

    app.logger.info('App startup')
    return app


def _configure_logging(app):
    """Log to stdout so journald owns rotation.

    The previous RotatingFileHandler had every worker writing the same file,
    which interleaves and can lose records when two workers rotate at once.
    """
    if app.debug or app.testing:
        return
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(logging.Formatter('%(levelname)s in %(module)s: %(message)s'))
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.logger.setLevel(logging.INFO)


def _persisted_secret(app, filename, configured):
    """Return the configured secret, or a random one persisted under instance/.

    Falling back to a generated-and-saved value keeps the app bootable without
    environment configuration, while never shipping a real key in the repo.
    Persisting it matters: a fresh key on every restart would invalidate all
    sessions and, for the analytics salt, re-count the entire audience.
    """
    if configured:
        return configured

    path = os.path.join(app.instance_path, filename)
    try:
        with open(path) as handle:
            existing = handle.read().strip()
            if existing:
                return existing
    except OSError:
        pass

    value = secrets.token_hex(32)
    try:
        fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, 'w') as handle:
            handle.write(value)
    except FileExistsError:
        # Another worker won the race; use whatever it wrote.
        with open(path) as handle:
            return handle.read().strip()

    app.logger.warning(
        '%s was not set; generated one at %s. Set it in the systemd unit to '
        'control it explicitly.', filename.upper(), path
    )
    return value


def _register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        app.logger.exception('internal server error')
        return render_template('errors/500.html'), 500
