from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import os
from routes.main import bpMain
from routes.users import bpUsers
import cloudinary

load_dotenv()

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG'] = True
app.config['ENV'] = 'development'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = f"{os.getenv('DIALECT')}+{os.getenv('DRIVER')}://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"


app.config["JWT_SECRET_KEY"] = 'ElvandMauForever'
jwt = JWTManager(app)

db.init_app(app)
Migrate(app, db)
CORS(app)

cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'),
    secure = True
)

app.register_blueprint(bpMain)
app.register_blueprint(bpUsers, url_prefix='/api')

if __name__ == '__main__':
    app.run()
