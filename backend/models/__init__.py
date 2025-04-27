from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
from .user import Users
from .devices import Device
from .ports import DevicePort
