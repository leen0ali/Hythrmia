import smtplib
from email.mime.text import MIMEText
import json
import os

### TODO
### This page is to send email about discovered devices only.
### Required Setup

list_devices = []

def send_email():
    filename = "ai_config.json"
    if not os.path.exists(filename):
        return {"error": "config file not found"}, 404

    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if not data.get("smtpEnabled"):
        return
    email = data.get("smtpEmail")
    password = data.get("smtpPass")


    if not email:
        print("[EMAIL] not set")
    if not password:
        print("[PASS] not set")

    if not list_devices:
        return
    else:
        body_lines = ["Discovered Devices:\n"]
        for idx, device in enumerate(list_devices, 1):
            line = f"{idx}. Name: {device.get('name', 'N/A')}, IP: {device.get('ip', 'N/A')}, MAC: {device.get('mac', 'N/A')}"
            print(line)
            body_lines.append(line)
        body = "\n".join(body_lines)

    msg = MIMEText(body)
    msg['Subject'] = "Hythrmia"
    msg['From'] = email
    msg['To'] = email

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(email, password)
        server.send_message(msg)

    list_devices.clear()

def add_device(device):
    list_devices.append(device)
