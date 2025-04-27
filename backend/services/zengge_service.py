from flask import session
from core.command import Command
from core.parser import FluxParser

def flux_d():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403
    try:
        flux_cmd = Command("flux_led", ["-s"])
        rst = flux_cmd.execute()
        if type(rst) == FluxParser:
            result, status = rst.parse()
            print("[DEBUG]: ", result)
            return {"data": result, "status": status}, 200
    except Exception as e:
        return {"error": str(e)}, 500
    return {"data": rst}, 200


def flux_turn_on(ip):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403
    try:
        flux_cmd = Command("flux_led", [ip,"--on"])
        rst = flux_cmd.execute()
        result = rst.parse()
        print("[DEBUG]: ", result)
    except Exception as e:
        return {"error": str(e)}, 500
    return {"data": result}, 200

def flux_turn_off(ip):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403
    try:
        flux_cmd = Command("flux_led", [ip,"--off"])
        rst = flux_cmd.execute()
        result = rst.parse()
        print("[DEBUG]: ", result)
    except Exception as e:
        return {"error": str(e)}, 500
    return {"data": result}, 200


def flux_color(ip, color):
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403
    try:
        flux_cmd = Command("flux_led", [ip,"-c", color])
        rst = flux_cmd.execute()
        result = rst.parse()
        print("[DEBUG]: ", result)
    except Exception as e:
        return {"error": str(e)}, 500
    return {"data": result}, 200

