import os
basedir = os.path.abspath(os.path.dirname(__file__))

# Different environments for the app to run in


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    CSRF_SESSION_KEY = "secret"
    SECRET_KEY = "not_this"
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    AWS_ACCESS_KEY_ID = "fake"
    AWS_SECRET_ACCESS_KEY = "news"
    if "AWS_ACCESS_KEY_ID" in os.environ:
        AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
        AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
