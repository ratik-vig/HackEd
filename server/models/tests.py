from database import db

class Test(db.Model):
  __tablename__="tests"

  id = db.Column(db.Integer, primary_key=True)
  #test_name = db.Column(db.String(100))
  answers = db.Column(db.PickleType())
  status = db.Column(db.Boolean(), default=False)
  #email = db.Column(db.String(255))
  no_questions = db.Column(db.Integer())

  def __init__(self, kwargs):
    self.id = kwargs.get('id')
    #self.test_name = kwargs.get('test_name')
    self.answers = kwargs.get('answers')
    #self.email = kwargs.get('email')
    self.no_questions = kwargs.get('no_questions')
    self.status = kwargs.get('status')

  @classmethod
  def getAll(cls):
    return Test.query.all()

