import os

# SET ENVIROMENT VARIABLES
# export SECRET_KEY='your_very_secret_key_here'
# export DATABASE_URL='postgresql://user:password@localhost/yourdatabase'

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', '5379d67e996f49e7a9ee9b597a00fb2d')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Additional configuration for SSL in production
    PREFERRED_URL_SCHEME = 'https'
