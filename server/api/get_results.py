from flask import Blueprint, jsonify, request

from models.results import Result

get_results_blueprint = Blueprint('get_results', __name__, template_folder="templates")

@get_results_blueprint.route('/get_results', methods=['GET'])
def get_results():
  t = request.args
  results = Result.query.filter_by(test_id=t["test_id"]).all()
  result = []
  for r in results:
    result.append({
      "responses": r.responses,
      "marks": r.marks,
      "enrollment_number": r.enrollment_number
    })
  return jsonify(result), 200
