import pickle

from flask import Blueprint, jsonify

from models.results import Result
from models.tests import Test

home_blueprint = Blueprint('home', __name__, template_folder="templates")


@home_blueprint.route('/', methods=['GET'])
#@UserAuthorizationService.login_required
def home():

  tests = Test.query.all()
  test = []
  for i in range(0, len(tests)):
    test.append({
      "id": tests[i].id,
      "no_questions": tests[i].no_questions,
      "status": tests[i].status,
      "answers": pickle.loads(tests[i].answers) if type(tests[i].answers) == bytes else tests[i].answers
    })

  return jsonify(test), 200




