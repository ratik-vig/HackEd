from flask import Blueprint, request

from database import db
from models.tests import Test

status_blueprint = Blueprint('status', __name__, template_folder="templates")

@status_blueprint.route('/update_status', methods=['PUT'])
def create_test():
  t = request.form.to_dict()
  test = Test.query.get(t["test_id"])
  if(test):
    test.status = True
    db.session.add(test)
    db.session.commit()
    return {"message": "Updated"}
  return {"message": "Test not found"}
