from flask import send_file
import requests
from requests.auth import HTTPDigestAuth
import os

def dahua_snapshot(ip, channel, user, password):
    filename = "snapshot.jpg"
    filepath = os.path.join("snapshots", filename)
    url = f"http://{ip}/cgi-bin/snapshot.cgi?channel={channel}"
    response = requests.get(url, auth=HTTPDigestAuth(user, password))
    if response.status_code == 200:
        os.makedirs("snapshots", exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        return {"url": f"/get-image/{filename}"}, 200
    return {"error": "Failed to get snapshot"}, 500


def get_image():
    filepath = os.path.join("snapshots", "snapshot.jpg")
    if os.path.exists(filepath):
        return send_file(filepath, mimetype='image/jpeg'), 200
    else:
        return {"error": "Image not found"}, 404
def dahua_hardware_version(ip, user, password):
    url = f"http://{ip}/cgi-bin/magicBox.cgi?action=getHardwareVersion"
    res = requests.get(url, auth=HTTPDigestAuth(user, password))
    
    if res.status_code == 200:
        try:
            try:
                data = res.json()
            except ValueError:
                data = res.content.decode('utf-8')  # Decode bytes to string
            print(data)  # Now data is either JSON or plain text
        except Exception as e:
            print(f"Error while parsing data: {str(e)}")
            return {"data": "Error parsing response"}, 500
    else:
        return {"data": f"Request failed with status code {res.status_code}"}, res.status_code
    
    return {"data": data}, res.status_code


def dahua_software_version(ip, user, password):
    url = f"http://{ip}/cgi-bin/magicBox.cgi?action=getSoftwareVersion"
    res = requests.get(url, auth=HTTPDigestAuth(user, password))
    
    if res.status_code == 200:
        try:
            # Try parsing as JSON
            try:
                data = res.json()  # This works if the response is in JSON format
            except ValueError:
                # If not JSON, decode the bytes to a string (assuming it's plain text)
                data = res.content.decode('utf-8')  # Decode bytes to string
            
            print(data)  # Now data is either JSON or plain text
        except Exception as e:
            print(f"Error while parsing data: {str(e)}")
            return {"data": "Error parsing response"}, 500
    else:
        return {"data": f"Request failed with status code {res.status_code}"}, res.status_code
    
    return {"data": data}, res.status_code


def dahua_machine_name(ip, user, password):
    url = f"http://{ip}/cgi-bin/magicBox.cgi?action=getMachineName"
    res = requests.get(url, auth=HTTPDigestAuth(user, password))
    
    if res.status_code == 200:
        try:
            # Try parsing as JSON
            try:
                data = res.json()  # This works if the response is in JSON format
            except ValueError:
                # If not JSON, decode the bytes to a string (assuming it's plain text)
                data = res.content.decode('utf-8')  # Decode bytes to string
            
            print(data)  # Now data is either JSON or plain text
        except Exception as e:
            print(f"Error while parsing data: {str(e)}")
            return {"data": "Error parsing response"}, 500
    else:
        return {"data": f"Request failed with status code {res.status_code}"}, res.status_code
    
    return {"data": data}, res.status_code


def dahua_system_info(ip, user, password):
    url = f"http://{ip}/cgi-bin/magicBox.cgi?action=getSystemInfo"
    res = requests.get(url, auth=HTTPDigestAuth(user, password))
    
    if res.status_code == 200:
        try:
            # Try parsing as JSON
            try:
                data = res.json()  # This works if the response is in JSON format
            except ValueError:
                # If not JSON, decode the bytes to a string (assuming it's plain text)
                data = res.content.decode('utf-8')  # Decode bytes to string
            
            print(data)  # Now data is either JSON or plain text
        except Exception as e:
            print(f"Error while parsing data: {str(e)}")
            return {"data": "Error parsing response"}, 500
    else:
        return {"data": f"Request failed with status code {res.status_code}"}, res.status_code
    
    return {"data": data}, res.status_code