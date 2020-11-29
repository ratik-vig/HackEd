import uuid

from flask import request, Blueprint, jsonify
from sqlalchemy import exc
from werkzeug.security import generate_password_hash

from database import db
from models.users import User

signup_blueprint = Blueprint("signup", __name__, template_folder="templates")

@signup_blueprint.route('/signup', methods = ['POST'])
def signup():
  data = request.form.to_dict()
  data['public_id'] = str(uuid.uuid4())
  user = User(data)
  user.password = generate_password_hash(user.password, method='sha256')
  try:
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Registered Successfully", "status": 200})
  except exc.SQLAlchemyError as e:
    db.session.rollback()
    return jsonify({"message": "User already exists", "status": 412})



