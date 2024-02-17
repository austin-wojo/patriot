import os

# Set key on heroku
# print(os.urandom(16).hex())
# heroku config:set SECRET_KEY='your_secret_key_here'

# Add SQL DB
# heroku addons:create heroku-postgresql:mini

# Init flask DB on heroku
# heroku run flask db upgrade -a warhammer-maker


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://", 1) if os.environ.get('DATABASE_URL') else 'sqlite:///site.db'
