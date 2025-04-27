from flask import Blueprint, jsonify, request
from services.scan_devices import arp, get_ip_ports, get_scanned_devices, delete_scanned_devices, get_selected_device, scan_ip_ports, scan_blues_devices, hydra
import asyncio

device_api = Blueprint('device_api', __name__)


stats = {
        "wifi_scans": 0,
        "bluetooth_scans": 0,
        "total_bluetooth_devices": 0,
        "total_wifi_devices":0
        }

@device_api.route('/get-stats', methods=['GET'])
def get_local_stats():
    return jsonify({"data": stats}), 200

@device_api.route('/scan-devices', methods=['POST'])
def scan_devices():
    data = request.get_json()
    f = data.get("f")
    t = data.get("t")
    specific = data.get("specific", False)
    print(f, t, specific)
    result, status = arp(f, t, specific)
    stats['wifi_scans'] +=1
    stats["total_wifi_devices"] = len(result['devices'])
    print(stats['total_wifi_devices'], stats['wifi_scans'])
    return jsonify(result), status

@device_api.route('/scan-bluetooth-devices')
def scan_bluetooth_devices():
    result, status = asyncio.run(scan_blues_devices())
    stats['bluetooth_scans'] +=1
    stats['total_bluetooth_devices'] = len(result['devices'])
    return result, status

@device_api.route('/get-devices', methods=['GET'])
def get_devices():
    result, status = get_scanned_devices()
    return jsonify(result), status

@device_api.route('/get-device/<int:id>', methods=['GET'])
def get_device(id):
    print("getting device", id)
    result, status = get_selected_device(id)
    return jsonify(result), status

@device_api.route('/delete-devices', methods=['GET'])
def delete_devices():
    result, status = delete_scanned_devices()
    return jsonify(result), status

@device_api.route('/scan-ports/<int:id>', methods=['GET'])
def scan_ports(id):
    result, status = scan_ip_ports(id)
    return jsonify(result), status

@device_api.route('/get-ports/<int:id>', methods=["GET"])
def get_ports(id):
    result, status = get_ip_ports(id)
    return jsonify(result), status

@device_api.route('/hydra-scan',methods=["POST"])
def hydra_scan():
    data = request.get_json()
    username = data.get("username")
    protocol = data.get("protocol")
    ip = data.get("ip")

    if not all([username, protocol, ip]):
        return {"error": "Missing required fields"}, 400

    result, status = hydra(username, ip, protocol)
    return jsonify(result), status 
