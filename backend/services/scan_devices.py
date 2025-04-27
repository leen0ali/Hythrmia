from flask import session
from openai import OpenAI
from core.parser import ArpParser, NmapParser
from core.command import Command
from models import db, Device, DevicePort
from typing import List
from bleak import BleakScanner
import requests
import json
import os
from datetime import datetime
import tempfile
import vulners


# here are the devices that we are going to check cve for.
allowedDevices = ['Dahua', 'Zengge', 'Zioncom', 'SHENZHEN']

def hydra(username, ip_address, protocol="rtsp"):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    allowed_protocols = ["rtsp", "ssh", "ftp", "rtsp-get", "rtsp-post"]
    if protocol not in allowed_protocols:
        return {"error": f"Unsupported protocol: {protocol}"}, 400


    temp_name = None

    try:
        filename = "ai_config.json"
        if not os.path.exists(filename):
            return {"error": "config file not found"}, 404

        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)

        passwords = data.get("passwords")
        if isinstance(passwords, str):
            passwords = passwords.splitlines()

        print(passwords)
        if not passwords:
            return {"error": "'passwords' key not found or empty in config"}, 400

        with tempfile.NamedTemporaryFile(mode="w+", delete=False) as temp:
            temp.write("\n".join(passwords))
            temp.flush()
            temp_name = temp.name

        rtsp_cmd = Command("hydra", ["-l", username, "-P", temp_name, ip_address, protocol])
        rst = rtsp_cmd.execute()

        return {"data": rst}, 200

    except Exception as e:
        return {"error": str(e)}, 500

    finally:
        if temp_name and os.path.exists(temp_name):
            os.remove(temp_name)

def arp(f, t, specific=False):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    if specific:
        if f and t:
            arp_cmd = Command("arp-scan", [f"{f}-{t}"])
        else:
            return {"error": "Missing arguments for specific scan."}, 400
    else:
        arp_cmd = Command("arp-scan", ["-l"])

    rst = arp_cmd.execute()
    print("[DEBUG]: ", rst)
    if isinstance(rst, ArpParser):
        results = rst.parse()
        ai_result = use_ai(results)

        for result in results:
            existing_device = Device.query.filter_by(mac_address=result['mac']).first()

            if existing_device:
                existing_device.ip = result['ip']
                existing_device.device_name = result['name']
                existing_device.ai_result = str(ai_result)
            else:
                new_device = Device(
                    ip=result['ip'],
                    mac=result['mac'],
                    device_name=result['name'],
                    ai_result=str(ai_result)
                )
                db.session.add(new_device)

        db.session.commit()
        return get_scanned_devices()

    return {"error": "Something unexpected happened"}, 400


async def scan_blues_devices():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    try:
        devices = await BleakScanner.discover()
        listOfDevices = []
        for device in devices:
            listOfDevices.append({"address":device.address, "name":device.name})
        return {"devices": listOfDevices}, 200
    except Exception as e:
        print("[SCAN BLUETOOTH - ERROR]: ", e)
        return {"error": str(e)}, 400

        
    

def scan_ip_ports(device_id):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    result, status = get_selected_device(device_id)

    if status == 200:
        nmap_cmd = Command("nmap", [result['ip']])
        rst = nmap_cmd.execute()

        if isinstance(rst, NmapParser):
            results = rst.parse()
            ai_result = use_ai(results) # only if AI is enabled

            for entry in results:
                existing_port = DevicePort.query.filter_by(device_id=device_id, port=entry['port']).first()

                if existing_port:
                    existing_port.status = entry['status']
                    existing_port.ai_result = str(ai_result)
                else:
                    new_port = DevicePort(
                        device_id=device_id,
                        port=entry['port'],
                        status=entry['status'],
                        ai_result=str(ai_result)
                    )
                    db.session.add(new_port)

            db.session.commit()
            return {"data": results, "ai_result": str(ai_result)}, 200

    return result, status


def get_ip_ports(device_id):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    result, status = get_selected_device(device_id)

    if status == 200:
        ports : List[DevicePort] = DevicePort.query.filter_by(device_id=device_id).all()
        listOfPorts = []
        if len(ports) <= 0:
            return {"error": "No scan results yet."}, 404

        for port in ports:
            listOfPorts.append(port.to_dict())

        return {"data": listOfPorts, "ai_result": listOfPorts[0]['ai_result']}, 200
    else:
        return result, status

def get_scanned_devices():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    devices: List[Device] = Device.query.all()
    listOfDevices = []
    if len(devices) <= 0:
        return {"error": "No scan results yet."}, 404

    for  device in devices:
        listOfDevices.append(device.to_dict())
    return {"devices": listOfDevices, "ai_result": listOfDevices[0]['ai_result']}, 200


def delete_scanned_devices():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    try:
        num_deleted = db.session.query(Device).delete()
        db.session.commit()
        return {"message": f"{num_deleted} devices deleted."}, 200

    except Exception as e:
        db.session.rollback()
        return {"error": f"Error deleting devices: {str(e)}"}, 500


def get_selected_device(id):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    try:
        device = db.session.query(Device).filter_by(id=id).first()
        if not device:
            return {"error": "Device not found"}, 404

        result = device.to_dict()

        for allowedDevice in allowedDevices:
            if allowedDevice.lower() in str(device.device_name).lower():  
                print("found the name", str(device.device_name))
                data, status = search_vulners_cves(allowedDevice.lower())
                if status == 200:
                    result['cve'] = data  
                else:
                    result['cve'] = {"error": "CVE data not found or failed to fetch"}  # Handle failure
        return result, 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}, 500


def use_ai(*outputs):
    filename = "ai_config.json"
    if not os.path.exists(filename):
        return "error: Config file not found 'ai_config.json' does not exist."
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if data['enabled'] == True:
        if data['type'] == 'gpt':
            print("we are doing gpt here")
            return request_openai(data['prompt'], str(outputs), data['gpt_token'], data['gpt_model'])
        else: ## means ollama
            print("we are doing ollama here")
            return request_ollama(data['prompt']+"\nData: "+str(outputs), data['ollama_url'], data['ollama_model'])


def request_ollama(prompt, ollama_url, model):
    payload = {
        "model": model, 
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(ollama_url, json=payload)
        if response.status_code == 200:
            result = response.json()
            result = result["response"].split("</think>")
            # print(result[1].strip())
            return result[1].strip()
        else:
            # print("error:", response.text)
            return "error: " +  response.text
    except Exception as e:
        return "error: " + str(e)

def request_openai(prompt, content, api_key, model):
    try:
        client = OpenAI(api_key=api_key)
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "".join(prompt)},
                {
                    "role": "user",
                    "content": content
                }
            ]
        )
        result = completion.choices[0].message.content
        return result
    except Exception as e:
        return "error: " + str(e)


def search_vulners_cves(vendor:str):
    filename = "ai_config.json"
    if not os.path.exists(filename):
        return "error: Config file not found 'ai_config.json' does not exist."
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if data["vulnersEnabled"] == False:
        return
    try:
        api_key = data["vulnersApiKey"]
        print(api_key)
        vulners_api = vulners.Vulners(api_key=api_key)
        query = f"type:cve AND {vendor}"
        search_results = vulners_api.search(query)
        
        current_year = datetime.now().year
        filtered_cves = []

        for cve_data in search_results:
            published_date = cve_data.get('published')
            if published_date:
                pub_year = int(published_date[:4])
                if current_year - 2 <= pub_year <= current_year:
                    filtered_cves.append({
                        "id": cve_data.get("id"),
                        "title": cve_data.get("title"),
                        "published": published_date,
                        "description": cve_data.get("description")
                    })
        return filtered_cves, 200

    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}, 500

