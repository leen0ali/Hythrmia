from models import Users
from utils.auth_utils import verify_password, gen_pass_hash
from models import db

def authenticate_user(data):
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return {"error": "Username and password are required"}, 400

    user = Users.query.filter_by(username=username).first()

    if user and verify_password(user.password, password):
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
        return {
                    "message": "Logged in successfully",
                    "user": user_data }, 200

    return {"error": "Invalid username or password"}, 401

def register_user(data):
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return {"error": "Missing required fields"}, 400

    password_hash = gen_pass_hash(password)
    print(password_hash)

    existing_user = Users.query.filter_by(username=username).first()
    if existing_user:
        return {"error": "Username already exists"}, 400

    try:
        new_user = Users(
                username=username,
                email=email,
                password=password_hash
        )
        db.session.add(new_user)
        db.session.commit()
        return {"message": "Signup successful! Please login."}, 200

    except Exception as e:
        db.session.rollback()
        print(f"Error creating user: {e}")
        return {"error": "An error occurred. Please try again."}, 500


