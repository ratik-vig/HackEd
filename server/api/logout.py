from flask import Blueprint, url_for
from werkzeug.utils import redirect

logout_blueprint = Blueprint('logout', __name__, template_folder="templates")

@logout_blueprint.route('/logout')

def logout():
    return redirect(url_for('login.login'))