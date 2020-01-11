from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager

from blacklist import BLACKLIST
from db import db

# create the app instance
app = Flask(__name__)

app.config[
    "PROPAGATE_EXCEPTIONS"
] = True  # exceptions are re-raised rather than being handled by app's error handlers
app.config["JWT_BLACKLIST_ENABLED"] = True  # enable blacklist feature
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = [
    "access",
    "refresh",
]  # allow blacklisting for access and refresh tokens
app.config["JWT_SECRET_KEY"] = "secret"  #

# creates an instance of flask-restful api that will be used to add our resources
api = Api(app)

# creates an instance of jwt manager that will handle authentication for the application
jwt = JWTManager(app)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
