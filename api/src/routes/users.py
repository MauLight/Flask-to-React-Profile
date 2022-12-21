from flask import Blueprint, jsonify, request
from models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

bpUsers = Blueprint('bpUsers', __name__)

@bpUsers.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    access_token = create_access_token(identity=email)
    return jsonify(access_token= access_token)


@bpUsers.route('/user', methods=['POST'])
def post_new_user():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User()
    user.email = email
    user.password = password
    user.save()
    return jsonify(user.serialize()), 200


@bpUsers.route('/user', methods=['GET'])
@jwt_required()
def get_user():

    email = get_jwt_identity()

    credentials = {
        "user": email
    }

    return jsonify(credentials)