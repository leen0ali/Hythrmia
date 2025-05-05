from flask import Blueprint, request
from services.dahua_service import dahua_machine_name, dahua_snapshot, dahua_software_version, dahua_system_info, get_image, dahua_hardware_version

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

@dahua_api.route('/get-system-info', methods=['POST'])
def get_hardware_version():
    data = request.get_json()
    username = data.get('username', 'admin')
    password = data.get('password')
    ip = data.get('ip')
    res_hardware, status_hardware = dahua_hardware_version(ip, username, password)
    print("Status: ", status_hardware)
    if status_hardware != 200:
        print("Failed to fetch, ", res_hardware)
        return res_hardware, status_hardware
    res_software, status_software = dahua_software_version(ip, username, password)
    print("Status: ", status_software)
    if status_software != 200:
        print("Failed to fetch, ", res_software, status_software)
        return res_software, status_software
    res_machine_name, status_name = dahua_machine_name(ip, username, password)
    print("Machine Name: Status: ", status_name)
    if status_name != 200:
        print("Failed to fetch, ", res_machine_name)
        return res_machine_name, status_name 
    res_sys_info, status_sys_info = dahua_system_info(ip, username, password)
    print("sys_info Status: ", status_sys_info)
    if status_sys_info != 200:
        print("Failed to fetch, ", res_sys_info)
        return res_sys_info, status_sys_info

    result = {
                "hardware": {"data": res_hardware, "status": status_hardware},
                "software": {"data": res_software, "status": status_software},
                "name": {"data": res_machine_name, "status": status_name},
                "sys_info": {"data": res_sys_info, "status": status_sys_info}
            }
    return result, 200
