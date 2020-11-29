from flask import request, Blueprint, jsonify

from database import db
from models.results import Result
from models.tests import Test
from services.compute_result import ComputeResult

# sys.path.append('..')

upload_blueprint = Blueprint("upload", __name__, template_folder="templates")


@upload_blueprint.route('/upload', methods=['POST'])
def upload_file():

  im = request.files['file']
  test_id = request.form.to_dict()["test_id"]
  test = Test.query.get(test_id)
  responses = ComputeResult.get_responses(im, test.no_questions)
  if(responses["isSuccessfull"]):
    marks = ComputeResult.checkAnswers(test.answers, responses)
    result = Result()
    result.test_id = test_id
    result.marks = marks
    result.responses = responses["answers"]
    result.enrollment_number = responses["enrollment_number"]
    db.session.add(result)
    db.session.commit()
    return jsonify({"message": "result successfully", "isSuccessful": True,
                    "marks": marks, "enrollment_number": result.enrollment_number})
  else:
    return jsonify({"message": responses["message"], "isSuccessful": False})
