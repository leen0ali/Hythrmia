from .user import user_api
from .device import device_api
from .dahua import dahua_api
from .zengge import zengge_api

def register_apis(app):
    app.register_blueprint(user_api, url_prefix="/api/users")
    app.register_blueprint(device_api, url_prefix="/api/devices")
    app.register_blueprint(dahua_api, url_prefix="/api/dahua")
    app.register_blueprint(zengge_api, url_prefix="/api/zengge")

