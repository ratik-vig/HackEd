from database import db


class User(db.Model):
  __tablename__="users"

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(100))
  last_name = db.Column(db.String(100))
  email = db.Column(db.String(255), nullable=False, unique=True)
  password = db.Column(db.String(255), nullable=False)
  role = db.Column(db.String(100))
  enrollment_number = db.Column(db.String(100), default = "")
  public_id = db.Column(db.String(100), unique=True)

  def __init__(self, kwargs):
    self.first_name = kwargs.get('first_name')
    self.last_name = kwargs.get('last_name')
    self.email = kwargs.get('email')
    self.password = kwargs.get('password')
    self.role = kwargs.get('role')

  @classmethod
  def getAll(cls):
    return User.query.all()





