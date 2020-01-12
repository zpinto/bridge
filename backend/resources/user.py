import traceback

from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    jwt_required,
    get_raw_jwt,
)
from blacklist import BLACKLIST

from db import (
    db,
    collection_names
)

_user_parser = reqparse.RequestParser()
_user_parser.add_argument(
    "username", type=str, required=True, help="This field cannot be blank."
)
_user_parser.add_argument(
    "password", type=str, required=True, help="This field cannot be blank."
)
_user_parser.add_argument(
    "user_type", type=str, required=True, help="This field cannot be blank."
)


class UserRegister(Resource):
    _user_parser = reqparse.RequestParser()

    _user_parser.add_argument(
        "username", type=str, required=True, help="This field cannot be blank."
    )
    _user_parser.add_argument(
        "password", type=str, required=True, help="This field cannot be blank."
    )
    _user_parser.add_argument(
        "first_name", type=str, required=True, help="This field cannot be blank."
    )
    _user_parser.add_argument(
        "last_name", type=str, required=True, help="This field cannot be blank."
    )
    _user_parser.add_argument(
        "user_type", type=str, required=True, help="This field cannot be blank."
    )

    def post(self):
        data = UserRegister._user_parser.parse_args()

        if not len(data['username']):
            return {"message": "The username has an invalid length"}, 400

        try:
            user = db.collection(
                collection_names['USERS']).document(data['username']).get()
        except:
            traceback.print_exc()
            return {"message": "An error occurred looking up the user"}, 500

        if user.exists:
            return {"message": "A user with that username already exists"}, 400

        if not len(data['password']):
            return {"message": "The password has an invalid length"}, 400

        try:
            db.collection(collection_names['USERS']).document(
                data['username']).set({
                    "username": data['username'],
                    "password": data['password'],
                    "first_name": data['first_name'],
                    "last_name": data['last_name'],
                    "user_type": data['user_type'],
                    "correct": 0,
                    "reviewed": 0
                })
            return {"message": "User created successfully."}, 201
        except:
            traceback.print_exc()
            return {"message": "An error occurred creating the user"}, 500


class User(Resource):

    @classmethod
    def get(cls, username):
        try:
            user = db.collection(
                collection_names['USERS']).document(username).get()
        except:
            return {"message": "An error occurred looking up the user"}, 500

        if user.exists:
            return user.to_dict(), 200
        return {"message": "user not found"}, 404

    @classmethod
    def delete(cls, username):
        try:
            user_ref = db.collection(
                collection_names['USERS']).document(username)
            user = user_ref.get()
        except:
            return {"message": "An error occurred trying to look up this user"}, 500

        if user.exists:
            try:
                user_ref.delete()

            except:
                return {"message": "An error occurred trying to delete this user"}, 500
            return {"message": "User was deleted"}, 200
        return {"message": "User not found"}, 404


class UserLogin(Resource):
    _user_parser = reqparse.RequestParser()

    _user_parser.add_argument(
        "username", type=str, required=True, help="This field cannot be blank."
    )
    _user_parser.add_argument(
        "password", type=str, required=True, help="This field cannot be blank."
    )

    def post(self):
        data = UserLogin._user_parser.parse_args()

        try:
            user_ref = db.collection(
                collection_names['USERS']).document(data['username'])
            user = user_ref.get()
        except:
            traceback.print_exc()
            return {"message": "An error occurred trying to look up this user"}, 500

        print(user)

        if user.exists:
            print("2")
            user_dict = user.to_dict()
            if safe_str_cmp(user_dict["password"], data["password"]):
                access_token = create_access_token(
                    identity=user_dict['username'], fresh=True
                )
                refresh_token = create_refresh_token(user_dict['username'])
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
