import cv2
import numpy as np
from ML.transform import main

class ComputeResult:

  @classmethod
  def get_responses(cls, im, questions):
    img_read = im.read()
    img = cv2.imdecode(np.fromstring(img_read, np.uint8), cv2.IMREAD_COLOR)
    fileName = im.filename
    img_resp = main(img, fileName, questions)
    return img_resp

  @classmethod
  def checkAnswers(cls, keySheet, omr_response):
    ans_key = {}
    score = 0
    for block in keySheet:
      ans_key[str(block["question"])] = block["answer"].lower()
    for qna in omr_response["answers"]:
      if ans_key[qna["question"][1:]] == qna["answer"].lower():
        score += 1
    return score

