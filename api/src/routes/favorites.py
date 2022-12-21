from flask import Blueprint, jsonify, request
from models import Favorites

bpFav = Blueprint('bpFav', __name__)


@bpFav.route('/favorites', methods=['GET'])
def all_favorites():
    favorites = Favorites.query.all()
    favorites = list(map(lambda favs: favs.serialize(), favorites))
    return jsonify(favorites), 200


@bpFav.route('/favorites', methods=['POST'])
def store_favorite():
    name = request.json.get('name')
    users_id = request.json.get('users_id')

    favorites = Favorites()
    favorites.name = name
    favorites.users_id = users_id
    favorites.save()
    return jsonify(favorites.serialize()), 200