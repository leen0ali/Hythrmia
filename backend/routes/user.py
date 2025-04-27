from flask import Blueprint, request, jsonify, session
from services.user_service import authenticate_user, register_user
import json
import os

user_api = Blueprint('user_api', __name__)

@user_api.route('/login', methods=['POST'])
def login():
    data = request.json
    result, status = authenticate_user(data)
    
    if status == 200:
        session['username'] = result['user']['username']
    
    return jsonify(result), status

@user_api.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "You have been logged out successfully."}), 200


@user_api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    result, status = register_user(data)

    return jsonify(result), status

@user_api.route('/save-config', methods=['POST'])
def save_config():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    content = request.get_json()
    filename = "ai_config.json"
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(content, f, indent=4)
    return jsonify({"message": f"Saved successfully"}), 200


@user_api.route('/get-config', methods=['GET'])
def get_config():
    if 'username' not in session:
        return {"error": "You must be admin to use this feature!"}, 403

    filename = "ai_config.json"
    if not os.path.exists(filename):
        return jsonify({"error": "Config file not found"}), 404
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data), 200

