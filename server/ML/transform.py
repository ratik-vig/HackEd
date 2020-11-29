import sys

from flask import jsonify

sys.path.append('..')

import glob
import numpy as np
import cv2
import os 
import shutil 
from ML.main import *
from ML.template import Template
import timeit
from ML.yolo_test import *

CFG_PATH = "ML/models/yolov4-obj.cfg"
WEIGHTS_PATH = "ML/models/yolov4_2000.weights"
CLASSES_PATH = "ML/models/classes.txt"


def order_points(pts):

	rect = np.zeros((4, 2), dtype = "float32")

	s = pts.sum(axis = 1)
	rect[0] = pts[np.argmin(s)]
	rect[2] = pts[np.argmax(s)]

	diff = np.diff(pts, axis = 1)
	rect[1] = pts[np.argmin(diff)]
	rect[3] = pts[np.argmax(diff)]

	return rect


def four_point_transform(image, pts):

	rect = order_points(pts)
	(tl, tr, br, bl) = rect

	widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
	widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
	maxWidth = max(int(widthA), int(widthB))

	heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
	heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
	maxHeight = max(int(heightA), int(heightB))

	dst = np.array([
		[0, 0],
		[maxWidth - 1, 0],
		[maxWidth - 1, maxHeight - 1],
		[0, maxHeight - 1]], dtype = "float32")

	M = cv2.getPerspectiveTransform(rect, dst)
	warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))

	return warped


def getLowerBoxs_30(img):

	crop_img_left = img[1300:,:1750]
	crop_img_right = img[1300:,1750:]

	crop_img_left = cv2.resize(crop_img_left,(2950,850)) 
	crop_img_right = cv2.resize(crop_img_right,(2950,850)) 

	return crop_img_left,crop_img_right


def get_enroll_testID_30(img):

	crop_roll = img[200:1250,150:1100]
	crop_roll = cv2.resize(crop_roll,(950,1050)) 

	# crop_test_id = img[200:1250,1200:1750]
	# crop_test_id = cv2.resize(crop_test_id,(550,1050)) 

	return crop_roll #,crop_test_id


def get_firstTenQs_30(img):

	mark = img[200:1250,1850:]
	mark = cv2.resize(mark,(250,290)) 
	return mark 
	

def perfromCropping_30(resImage,fileName,rois):

	lowerBox_left, lowerBox_right = getLowerBoxs_30(resImage.copy())
	enrollment = get_enroll_testID_30(resImage.copy())
	
	mark = get_firstTenQs_30(resImage.copy())

	name = fileName.split(".")[0]

	im_arrays = [mark,lowerBox_left,lowerBox_right,enrollment]

	for roi,roi_im in zip(rois,im_arrays):
		os.makedirs(f"ML/temp_files/{roi}/{name}")
		cv2.imwrite(f"ML/temp_files/{roi}/{name}/{roi}.png",roi_im)

	return 

def makeFolders(rois):

	for dir_path in rois:
		d_path = os.path.join("ML","temp_files",dir_path)
		if os.path.exists(d_path):
			shutil.rmtree(d_path)
		
		os.makedirs(d_path)


def getTemplate():

	response = {
				"isSuccessfull" : False,
				"enrollment_number" : "",
				}

	return response


def postprocess_response(roi, process_resp, final_response, convert, answers):

	# print(roi , "------",process_resp)

	if roi == "enrollment":
		
		enrollment_number = "".join(list(map(lambda x:convert[x] ,process_resp.values())))
		final_response["enrollment_number"] = enrollment_number

	elif roi in  ["mark","lowerBox_left","lowerBox_right"] :

		answers = answers.update(process_resp)

	return


def format_dict(answers):

	res=[]

	for k,v in answers.items():
		res += {'question': k, 'answer': v},
		
	return res

def performDetectionRecognization(rois,questions):


	convert = {str(i):str((i+1)%10) for i in range(0,10)}

	response = getTemplate()
	answers = {}
	# print("currPath ", os.getcwd())

	try:
		for roi in rois:
			templatePath = Template(f"ML/templates/{questions}/template_{roi}.json")
			roi_path = os.path.join("ML","temp_files",roi)

			resp = process_dir(roi_path,'',templatePath,[])[0]
			
			# print(resp)
			postprocess_response(roi,resp,response,convert,answers)

			# response["answers"] = sort_answers(answers)
			response["answers"] = format_dict(answers)
			response["isSuccessfull"] = True
	except:
		response = {}
		response["isSuccessfull"] = False
		response["message"] = "Please try again"

	return response

def getLowerBoxs_20(img):

	crop_img_left = img[1500:,:1750]
	crop_img_right = img[1500:,1750:]

	crop_img_left = cv2.resize(crop_img_left,(2950,850)) 
	crop_img_right = cv2.resize(crop_img_right,(2950,850)) 

	return crop_img_left,crop_img_right


def get_enroll_testID_20(img):

	crop_roll = img[250:1450,100:1100]
	crop_roll = cv2.resize(crop_roll,(950,1050)) 

	crop_test_id = img[250:1450,1100:1700]
	crop_test_id = cv2.resize(crop_test_id,(550,1050)) 

	return crop_roll,crop_test_id


def get_firstTenQs_20(img):

	mark = img[300:1500,1850:]
	mark = cv2.resize(mark,(250,290)) 
	
	return mark 
	

def perfromCropping_20(resImage,fileName,rois):

	lowerBox_left, lowerBox_right = getLowerBoxs_20(resImage.copy())
	enrollment,test_id = get_enroll_testID_20(resImage.copy())
	
	mark = get_firstTenQs_20(resImage.copy())

	name = fileName.split(".")[0]

	im_arrays = [mark,lowerBox_left,lowerBox_right,enrollment,test_id]

	# print("cropping area : ",os.getcwd())

	for roi,roi_im in zip(rois,im_arrays):
		os.makedirs(f"ML/temp_files/{roi}/{name}")
		cv2.imwrite(f"ML/temp_files/{roi}/{name}/{roi}.png",roi_im)

	# cv2.imwrite("res_20.png",resImage)

	return 


# def shadow_removal(img):
#     '''
#     Remove shadow/darkness from the Image
#     '''
#     rgb_planes = cv2.split(img)
#     result_planes = []
#     for plane in rgb_planes:
#         # dilated_img = cv2.dilate(plane, np.ones((7,7), np.uint8))
        
#         bg_img = cv2.medianBlur(plane, 40)
#         diff_img = 255 - cv2.absdiff(plane, bg_img)
#         result_planes.append(diff_img) 

#     return cv2.merge(result_planes) 


# def preprocessImage(im):

	# thres = im
	# im[im>180] = 255
	# im[im<100] = 0

	# im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

	# clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(3,3))
	# im = clahe.apply(im)

	# kernel = np.ones((5,5),np.uint8)

	# _, im = cv2.threshold(im,127,255,cv2.THRESH_BINARY)

	# for i in range(2):
		# im = cv2.erode(im,kernel,iterations = 3)
		# im = cv2.dilate(im,kernel,iterations = 3)

	# im = shadow_removal(im)
	# im[im<80] = 0

	# return im


def main(im,fileName,questions):

	# print("im : ")
	# print("-"*30)
	# print(im)
	# print("-"*30)

	# print("path : ",os.getcwd())

	drawn_im, coords = get_predictions(im, CFG_PATH, WEIGHTS_PATH, CLASSES_PATH)
	if len(coords) != 4:
		response = {}
		response["isSuccessfull"] = False
		response["message"] = "Could not find all 4 corners of the document"
		return response

	rois = ["mark","lowerBox_left","lowerBox_right","enrollment"]
	makeFolders(rois)
	# return {}

	pts = np.array(coords, dtype = "float32")
	
	#1 
	resImage = four_point_transform(im,pts)
	resImage = cv2.resize(resImage,(2950,2150))

	#1.2
	# resImage = preprocessImage(resImage)
	# _, resImage = cv2.threshold(resImage,127,255,cv2.THRESH_BINARY)
	# resImage = cv2.adaptiveThreshold(resImage,255,cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY,11,2)

	# cv2.imshow(imgPath,resImage)
	# cv2.waitKey()

	#2
	if questions == 30:
		perfromCropping_30(resImage,fileName,rois)
	elif questions == 20:
		perfromCropping_20(resImage,fileName,rois)

	#3
	response = performDetectionRecognization(rois,questions)


	cv2.destroyAllWindows()

	#4
	os.system("rm -rf ML/temp_files")


	return response

if __name__ == "__main__":
	
	t1 =  timeit.default_timer()
	
	"------------------------------------------------------"

	questions = 20
	imgPath = "45.jpg"
	
	im = cv2.imread(imgPath)
	main(im, imgPath, questions)
	
	"------------------------------------------------------"


	# questions = 30
	# ls = glob("../testing/images/*")

	# right = 0
	# wrong = 0
	
	# correct = []
	# incorrect = []

	# for imgPath in ls:
	# 	print(imgPath,"\n")
	# 	im = cv2.imread(imgPath)
	# 	resp = main(im, imgPath, questions)
	# 	print(resp)

	# 	if resp["isSuccessfull"]:
	# 		right += 1
	# 		correct += os.path.basename(imgPath),
	# 	else:
	# 		wrong += 1
	# 		incorrect += os.path.basename(imgPath),
	# 	print("____________________________________________")

	# print("right : ",right , correct)
	# print("wrong : ",wrong, incorrect)
	"------------------------------------------------------"
	
	t2 = timeit.default_timer()
	print("\n",t2-t1,"seconds")












