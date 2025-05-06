from flask import Blueprint, request
from services.zwave_service import scan_zwave

zwave_api = Blueprint('zwave_api', __name__)

@zwave_api.route('/scan-zwave', methods=['GET'])
def scan_z_waves():
    result, status = scan_zwave()
    return result, status