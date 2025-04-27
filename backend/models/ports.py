from models import db

class DevicePort(db.Model):
    __tablename__ = 'device_port'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    device_id = db.Column(db.Integer, db.ForeignKey('devices.id'), nullable=False)
    port = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Text, nullable=False)
    ai_result = db.Column(db.Text, nullable=False)

    def __init__(self, device_id, port, status, ai_result=""):
        self.device_id = device_id
        self.port = port
        self.status = status
        self.ai_result = ai_result

    def to_dict(self):
        return {
            "id": self.id,
            "port": self.port,
            "status": self.status,
            "ai_result": self.ai_result
        }

