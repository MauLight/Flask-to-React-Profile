import os
import datetime
import subprocess
from flask import Blueprint, Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename

bpScripts = Blueprint('bpScripts', __name__)

ALLOWED_EXTENSIONS = set(['pdf'])
UPLOAD_FOLDER = './upload_dir/'


def CreateNewDir():
    print("I am being called")
    global UPLOAD_FOLDER
    print(UPLOAD_FOLDER)
    UPLOAD_FOLDER = UPLOAD_FOLDER+datetime.datetime.now().strftime("%d%m%y%H")
    cmd = "mkdir -p %s && ls -lrt %s" % (UPLOAD_FOLDER, UPLOAD_FOLDER)
    output = subprocess.Popen(
        [cmd], shell=True,  stdout=subprocess.PIPE).communicate()[0]

    if "total 0" in output:
        print("Success: Created Directory %s") % (UPLOAD_FOLDER)
    else:
        print("Failure: Failed to Create a Directory (or) Directory already Exists"), UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bpScripts.route('/upscripts', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            UPLOAD_FOLDER = 'http://127.0.0.1:5000/api/upscripts/upload_dir/'
            CreateNewDir()
            # global UPLOAD_FOLDER
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return jsonify('uploaded_file', filename=filename)
