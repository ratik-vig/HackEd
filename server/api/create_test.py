from flask import Blueprint, request
from sqlalchemy import exc

from database import db
from models.tests import Test

test_blueprint = Blueprint('test', __name__, template_folder="templates")

@test_blueprint.route('/create_test', methods=['POST'])
def create_test():

  t = request.form.to_dict()
  t["answers"] = eval(t["answers"])
  t["status"] = False
  data = Test(t)
  try:
    db.session.add(data)
    db.session.commit()
    return {'message': 'success'}, 200
  except exc.SQLAlchemyError as e:
   db.session.rollback()
   return {'message': 'unsuccessful'}, 400

