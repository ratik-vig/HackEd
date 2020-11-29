# HackEd

A mobile application which helps the users to grade multiple-choice tests in minutes. The user would be able to upload the image of OMR sheet and within seconds, the app returns the marks along with the responses marked by the students

## Installation - Android App

```bash
cd client
```
Install Expo
```node
npm install --global expo-cli
```
Install dependencies
```node
npm install
```
- Change URL in constants/Globals.js to your computers IP.

- IP can be found in windows using 
```bash
ipconfig
```
- Mac or Linux
```bash
ifconfig
```

Run using
```node
npm start
```
A tab will open on your web browser. Download Expo client app from the play store and scan the QR code from the tab opened in the browser.

## Installation - Backend

 - Go to server directory 
```bash
cd server
```
  - Create python3 virtual environment using the command
```bash 
virtualenv -p $(which python3) venv
```
 - Activate virtual environment using 
```bash 
source venv/bin/activate
```
 - Install requirements using 
```python 
pip install -r requirements.txt
```
   - Copy weights file from the link - <https://drive.google.com/file/d/1s7jCgyH3NpVWnXlswEAuWrdBeNDDnLjx/view?usp=sharing> into server/ML/models

   - run the app using the command 
```python
python app.py
```
