from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from bson import json_util
from bson.objectid import ObjectId
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
)
from blacklist import BLACKLIST

from db import db

_user_parser = reqparse.RequestParser()
_user_parser.add_argument(
    "username", type=str, required=True, help="This field cannot be blank."
)
_user_parser.add_argument(
    "password", type=str, required=True, help="This field cannot be blank."
)
_user_parser.add_argument(
    "type", type=str, required=True, help="This field cannot be blank."
)


class UserRegister(Resource):

    def post(self):
        data = _user_parser.parse_args()

        try:
            user = mongo.db.users.find_one({"username": data["username"]})
            user = db.collections().document()
        except:
            return {"message": "An error occurred looking up the user"}, 500

        if user:
            return {"message": "A user with that username already exists"}, 400

        try:
            mongo.db.users.insert_one(
                {"username": data["username"], "password": data["password"]}
            )

            return {"message": "User created successfully."}, 201
        except:
            return {"message": "An error occurred creating the user"}, 500


class User(Resource):

    @classmethod
    def get(cls, username):
        try:
            user = mongo.db.users.find_one({"username": username})
        except:
            return {"message": "An error occurred looking up the user"}, 500

        if user:
            return json_util._json_convert(user), 200
        return {"message": "user not found"}, 404

    @classmethod
    def delete(cls, username):
        try:
            user = mongo.db.users.find_one({"username": username})
        except:
            return {"message": "An error occurred trying to look up this user"}, 500

        if user:
            try:
                mongo.db.users.delete_one({"username": username})
            except:
                return {"message": "An error occurred trying to delete this user"}, 500
            return {"message": "User was deleted"}, 200
        return {"message": "User not found"}, 404


class UserLogin(Resource):

    def post(self):
        data = _user_parser.parse_args()

        try:
            user = mongo.db.users.find_one({"username": data["username"]})
        except:
            return {"message": "An error occurred trying to look up this user"}, 500

        if user and safe_str_cmp(user["password"], data["password"]):
            access_token = create_access_token(
                identity=str(user.get("_id")), fresh=True
            )
            refresh_token = create_refresh_token(str(user.get("_id")))
            return {"access_token": access_token, "refresh_token": refresh_token}, 200

        return {"message": "Invalid Credentials!"}, 401


class UserLogout(Resource):

    @jwt_required
    def post(self):
        jti = get_raw_jwt()["jti"]
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200


class TokenRefresh(Resource):

    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200
