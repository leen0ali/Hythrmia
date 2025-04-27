from models import db

class Device(db.Model):
    __tablename__ = 'devices'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ip_address = db.Column(db.String(20), nullable=False)
    mac_address = db.Column(db.String(50), nullable=False)
    device_name = db.Column(db.String(50), nullable=False)
    ai_result = db.Column(db.Text, nullable=False)
    ports = db.relationship('DevicePort', backref='device', cascade='all, delete-orphan')

    def __init__(self, ip, mac, device_name, ai_result=""):
        self.ip_address = ip
        self.mac_address = mac
        self.device_name = device_name
        self.ai_result = ai_result

    def __repr__(self):
        return f"<Device {self.device_name} - {self.ip_address}>"

    def to_dict(self):
        return {
            "id": self.id,
            "ip": self.ip_address,
            "mac": self.mac_address,
            "name": self.device_name,
            "ai_result":self.ai_result,
            "ports": [port.to_dict() for port in self.ports]
        }
