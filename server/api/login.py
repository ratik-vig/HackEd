from flask import request, Blueprint, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

from models.users import User

# from flask_jwt import jwt

login_blueprint = Blueprint("login", __name__, template_folder="templates")

@login_blueprint.route('/login', methods = ['POST'])
def login():

  email_id = request.form['email']
  password = request.form['password']
  user = User.query.filter_by(email=email_id).first()
  if not user:
    return jsonify({'message': 'user not found'})
  if check_password_hash(user.password, password):

    access_token = create_access_token(identity={"email_id": email_id})
    return jsonify({'token': access_token, 'status': 200, "first_name": user.first_name, "last_name": user.last_name})

  else:
    return jsonify({'message': 'wrong password'})




