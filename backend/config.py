import os

class Config:
    # Secret Key
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'user')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'password')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'hythrmia_db')

    SQLALCHEMY_DATABASE_URI = (
        f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:3306/{MYSQL_DB}'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False  
