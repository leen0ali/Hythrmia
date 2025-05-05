from flask import Flask
import config
from routes import register_apis
from models import db
from flask_cors import CORS
from sqlalchemy import text

app = Flask(__name__)
app.config.from_object(config.Config)

CORS(app, resources={r"/api/*": {"origins": "http://192.168.1.3:8080", "supports_credentials": True}})

db.init_app(app)

state = {
        "wifi_devices_scanned": 0,
        "bluetooth_devices_scanned": 0,
        "total_bluetooth_devices": 0,
        "total_wifi_deivces":0
        }

with app.app_context():
    try:
        db.session.execute(text("SELECT 1"))
        print("Successfully connected to the database.")
    except Exception as e:
        print("Failed to connect to the database:", e)

register_apis(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
