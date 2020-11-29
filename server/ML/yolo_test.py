import cv2
import argparse
import numpy as np


def get_output_layers(net):
    
    layer_names = net.getLayerNames()
    output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
    return output_layers


# function to draw bounding box on the detected object with class name
def draw_bounding_box(img, class_id, confidence, x, y, x_plus_w, y_plus_h, classes):
    
    label = str(classes[class_id])

    cv2.rectangle(img, (x,y), (x_plus_w,y_plus_h), (0,0,255),4)

    # cv2.putText(img, f"{round(confidence,2)}", (x-10,y-10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255),4)

# def getLeftTopCoord_ofDot(thres_im):

#     for i in range(len(thres_im)):
#         for j in range(len(thres_im[i])):
#             if thres_im[i][j] == 0:
#                 return (i,j)



# def findBlackDot(image,box):

#     x,y,w,h = box

#     print(x,y,w,h)

#     dot_im = image[int(y):int(y+h),int(x):int(x+w)]
#     grayImage = cv2.cvtColor(dot_im, cv2.COLOR_BGR2GRAY)

#     _, thres_im = cv2.threshold(grayImage,127,255,cv2.THRESH_BINARY)

#     # print(thres_im)
#     idxs_x,idxs_y = np.where(thres_im != 255)

#     i = min(idxs_x)
#     j = min(idxs_y)

#     # i,j = getLeftTopCoord_ofDot(thres_im)
#     # i,j = 0,0
#     return x+i,y+j


def get_predictions(image,cfgPath,weightPath,classesPath):
        
    # image = cv2.imread(imgPath)

    Width = image.shape[1]
    Height = image.shape[0]
    scale = 0.00392

    # read class names from text file

    classes = None
    with open(classesPath, 'r') as f:
        classes = [line.strip() for line in f.readlines()]

    # generate different colors for different classes 
    
    # read pre-trained model and config file
    net = cv2.dnn.readNet(weightPath,cfgPath)

    # create input blob 
    blob = cv2.dnn.blobFromImage(image, scale, (416,416), (0,0,0), True, crop=False)

    # set input blob for the network
    net.setInput(blob)



    # run inference through the network
    # and gather predictions from output layers
    outs = net.forward(get_output_layers(net))

    # initialization
    class_ids = []
    confidences = []
    boxes = []
    conf_threshold = 0.1
    nms_threshold = 0.4

    # for each detetion from each output layer 
    # get the confidence, class id, bounding box params
    # and ignore weak detections (confidence < 0.5)

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                center_x = int(detection[0] * Width)
                center_y = int(detection[1] * Height)
                w = int(detection[2] * Width)
                h = int(detection[3] * Height)
                x = center_x - w / 2
                y = center_y - h / 2
                class_ids.append(class_id)
                confidences.append(float(confidence))
                boxes.append([x, y, w, h])

    indices = cv2.dnn.NMSBoxes(boxes, confidences, conf_threshold, nms_threshold)


    coords_dots = []

    # go through the detections remaining
    # after nms and draw bounding box
    for i in indices:
        i = i[0]
        box = boxes[i]
        x = box[0]
        y = box[1]
        w = box[2]
        h = box[3]
        
        # print("coords ",x,y,w,h)

        # dot_x,dot_y = findBlackDot(image,box)

        # coords_dots += [dot_x,dot_y],
        coords_dots += [x+w//2,y+h//2],

        # draw_bounding_box(image, class_ids[i], confidences[i], round(x), round(y), round(x+w), round(y+h),classes)

    # display output image    
    # im = cv2.resize(image,(1280,960))
    # cv2.imshow("object detection", im)

    # wait until any key is pressed
    # cv2.waitKey()

    # save output image to disk
    # cv2.imwrite("object-detection.jpg", image)

    # release resources
    cv2.destroyAllWindows()

    return image, coords_dots

if __name__ == "__main__":
    
    cfgPath = "yolov4-obj.cfg"
    weightPath = "models/yolov4_2000.weights"
    classesPath = "classes.txt"
    imagePath = "152.jpg"

    drawn_im, coords = get_predictions(imagePath, cfgPath, weightPath, classesPath)















