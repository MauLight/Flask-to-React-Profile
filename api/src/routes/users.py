from flask import Blueprint, jsonify, request
from flask import Flask, render_template, request, send_file
from models import User
from models import Scripts
from models import Userpicture
from models import Scriptcover
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from io import BytesIO
import cloudinary.uploader

bpUsers = Blueprint('bpUsers', __name__)


@bpUsers.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token, "user_id": user.id })


@bpUsers.route('/user', methods=['POST'])
def post_new_user():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    user = User()
    user.username = username
    user.email = email
    user.password = password
    user.save()
    return jsonify(user.serialize()), 200


@bpUsers.route('/user/<int:id>/update', methods=['PUT'])
def update_user(id):

    firstname = request.json.get('firstname')  # type: ignore
    lastname = request.json.get('lastname')  # type: ignore
    biography = request.json.get('biography')  # type: ignore
    image = request.json.get('image')  # type: ignore

    user = User.query.get(id)
    user.firstname = firstname
    user.lastname = lastname
    user.biography = biography
    user.image = image

    user.save()
    return jsonify(user.serialize()), 200


@bpUsers.route('/scripts', methods=['POST'])
def post_new_script():
    title = request.json.get('title')
    year = request.json.get('year')
    length = request.json.get('length')
    genre = request.json.get('genre')
    logline = request.json.get('logline')
    cover = request.json.get('cover')
    uuid = request.json.get('uuid')
    user_id = request.json.get('user_id')

    script = Scripts()
    script.title = title
    script.year = year
    script.length = length
    script.genre = genre
    script.logline = logline
    script.cover = cover
    script.uuid = uuid
    script.user_id = user_id
    script.save()
    return jsonify(script.serialize()), 200


@bpUsers.route('/user', methods=['GET'])
@jwt_required()
def get_user():

    id = get_jwt_identity()

    credentials = {
        "user": id
    }

    return jsonify(credentials)


@bpUsers.route('/users', methods=['GET'])  # type: ignore
def all_users():
    users = User.query.all()
    # rememeber to change to "serialize before deployment".
    users = list(map(lambda user: user.serialize_with_scripts(), users))
    return jsonify(users), 200


@bpUsers.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_user_by_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_scripts()), 200


@bpUsers.route('/uploads', methods=['POST'])
def userpictures():

    user_id = request.form['user_id']
    image = request.files["image"]
    resp = cloudinary.uploader.upload(image, folder="picture")
    if not resp:
        return jsonify({"msg": "error uploading image"}), 400
    user_picture_image = Userpicture()
    user_picture_image.filename = resp['secure_url']
    user_picture_image.user_id = user_id
    user_picture_image.save()
    return jsonify(user_picture_image.serialize()), 200


@bpUsers.route('/uploads/<int:user_id>', methods=['GET', 'PUT'])
def getuserpictures(user_id):

    if request.method == 'GET':

        if user_id is not None:
            userpictures = Userpicture.query.filter_by(
                user_id=user_id).first()
            print(userpictures)
            if not userpictures:
                return jsonify({"msg": "User has no picture!"}), 400
            return jsonify(userpictures.serialize()), 200
        else:
            return jsonify({"msg": "user_id doesn't exist!"}), 400

    if request.method == 'PUT':

        # user_id = request.form['user_id']
        image = request.files.getlist("image")

        print(image)
        data = []
        resp = cloudinary.uploader.upload(image, folder="picture")

        if not resp:
            return jsonify({"msg": "error uploading image"}), 400

        user_picture_image = Userpicture.query.filter_by(user_id=user_id)
        user_picture_image.filename = resp['secure_url']
        user_picture_image.update()
        data.append(user_picture_image.serialize())
        return jsonify(data), 200


@bpUsers.route('/cover', methods=['POST'])
def scriptcover():

    script_id = request.form['script_id']
    image = request.files["image"]
    resp = cloudinary.uploader.upload(image, folder="picture")
    if not resp:
        return jsonify({"msg": "error uploading image"}), 400
    scriptcover = Scriptcover()
    scriptcover.filename = resp['secure_url']
    scriptcover.script_id = script_id
    scriptcover.save()
    return jsonify(scriptcover.serialize()), 200


@bpUsers.route('/cover/<int:script_id>', methods=['GET', 'PUT'])
def get_or_update_scriptcover(script_id):

    if request.method == 'GET':

        if script_id is not None:
            scriptcover = Scriptcover.query.filter_by(
                script_id=script_id).first()
            print(scriptcover)
            if not scriptcover:
                return jsonify({"msg": "Script has no cover!"}), 400
            return jsonify(scriptcover.serialize()), 200
        else:
            return jsonify({"msg": "script_id doesn't exist!"}), 400

    if request.method == 'PUT':

        image = request.files.getlist("image")

        print(image)
        data = []
        resp = cloudinary.uploader.upload(image, folder="picture")

        if not resp:
            return jsonify({"msg": "error uploading image"}), 400

        scriptcover = Scriptcover.query.filter_by(script_id=script_id)
        scriptcover.filename = resp['secure_url']
        scriptcover.update()
        data.append(scriptcover.serialize())
        return jsonify(data), 200


@bpUsers.route('/user/<int:id>/delete', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    user.delete()
    return jsonify({"message": "User Deleted!"}), 200
