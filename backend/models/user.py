from models import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password


    def __repr__(self):
        return f'<User {self.id} - {self.username} {self.email}>'
