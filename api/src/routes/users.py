from flask import Blueprint, jsonify, request
from models import User
from models import Scripts
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

bpUsers = Blueprint('bpUsers', __name__)


@bpUsers.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


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


@bpUsers.route('/user/<int:id>/update', methods = ['PUT'])
def update_user(id):
    
    firstname = request.json.get('firstname') # type: ignore
    lastname = request.json.get('lastname') # type: ignore
    biography = request.json.get('biography') # type: ignore
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
    logline = request.json.get('logline')
    cover = request.json.get('cover')
    url = request.json.get('url')
    user_id = request.json.get('user_id')

    script = Scripts()
    script.title = title
    script.year = year
    script.logline = logline
    script.cover = cover
    script.url = url
    script.user_id = user_id
    script.save()
    return jsonify(script.serialize()), 200


@bpUsers.route('/user', methods=['GET'])
@jwt_required()
def get_user():

    email = get_jwt_identity()

    credentials = {
        "user": email
    }

    return jsonify(credentials)


@bpUsers.route('/user<int:id>', methods=['GET'])
@jwt_required()
def get_user_by_id(id):
    user = User.query.get(id)
    return jsonify(user.serialize_with_scripts()), 200
