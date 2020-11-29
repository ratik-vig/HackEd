from database import db

class Result(db.Model):
  __tablename__="results"

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(255), default="")
  test_id = db.Column(db.Integer)
  responses = db.Column(db.PickleType())
  marks = db.Column(db.Integer)
  enrollment_number = db.Column(db.String(255))

  @classmethod
  def getAll(cls):
    return Result.query.all()

