from werkzeug.security import check_password_hash, generate_password_hash

def verify_password(hashed_password, plain_password):
    return check_password_hash(hashed_password, plain_password)


def gen_pass_hash(password):
    return generate_password_hash(password)
