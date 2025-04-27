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
