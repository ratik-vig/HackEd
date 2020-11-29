from api.change_status import status_blueprint
from api.create_test import test_blueprint
from api.get_results import get_results_blueprint
from api.home import home_blueprint
from api.login import login_blueprint
from api.logout import logout_blueprint
from api.signup import signup_blueprint
from api.upload import upload_blueprint


class RegisterBlueprints:

  def __init__(self, app, db):
    app.register_blueprint(login_blueprint)
    app.register_blueprint(signup_blueprint)
    app.register_blueprint(upload_blueprint)
    app.register_blueprint(home_blueprint)
    app.register_blueprint(logout_blueprint)
    app.register_blueprint(test_blueprint)
    app.register_blueprint(status_blueprint)
    app.register_blueprint(get_results_blueprint)