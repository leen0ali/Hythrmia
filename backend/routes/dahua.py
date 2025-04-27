from flask import Blueprint, request
from services.dahua_service import dahua_snapshot, get_image

dahua_api = Blueprint('dahua_api', __name__)


@dahua_api.route("/snapshot", methods=["POST"])
def snapshot():
    data = request.get_json()
    channel = data.get('channel', 2)
    username = data.get('username', 'admin')
    password = data.get('password')
    ip = data.get('ip')
    result, status = dahua_snapshot(ip, channel, username, password)
    return result, status

@dahua_api.route("/get-image")
def snapshot_image():
    result, status = get_image()
    return result, status

