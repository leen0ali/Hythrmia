from flask import Blueprint, jsonify, request
from services.zengge_service import flux_color, flux_d, flux_turn_on, flux_turn_off

zengge_api = Blueprint('zengge_api', __name__)

@zengge_api.route("/scan-devices", methods=['GET'])
def scan_devices():
    result, status = flux_d()
    return jsonify(result), status


@zengge_api.route("/turn-on/<string:ip>", methods=["GET"])
def turn_on_device(ip):
    result, status = flux_turn_on(ip)
    return jsonify(result), status

@zengge_api.route("/turn-off/<string:ip>", methods=["GET"])
def turn_off_device(ip):
    result, status = flux_turn_off(ip)
    return jsonify(result), status

@zengge_api.route("/color", methods=["POST"])
def change_color():
    data = request.get_json()
    ip = data.get("ip")
    color = data.get("color")
    result, status = flux_color(ip, color)
    return jsonify(result), status


