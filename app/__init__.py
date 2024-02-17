from flask import Flask
from .extensions import db, login_manager, migrate
from config import Config
from .routes import register_blueprints
import logging
from logging.handlers import RotatingFileHandler
import os


login_manager.login_view = 'auth.login'  # Specify the login route
login_manager.login_message_category = 'info'  # Optional: Customize login message category

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)

    # Enable logging
    if not app.debug and not app.testing:
        if not os.path.exists('logs'):
            os.mkdir('logs')
        file_handler = RotatingFileHandler('logs/yourapp.log', maxBytes=10240,
                                        backupCount=10)
        file_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

        app.logger.setLevel(logging.INFO)
        app.logger.info('App startup')

    # Register blueprints
    register_blueprints(app)
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()  # If using a DB
        return render_template('500.html'), 500

    return app
