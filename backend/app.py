from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from blacklist import BLACKLIST
from db import db

from resources.user import UserRegister, User, UserLogin, UserLogout, TokenRefresh
from resources.applicant import JobPostList, SubmitApplication, ApplicantApplications, ReviewByApplicant
from resources.recruiter import PostJob, RecruiterJobPostingList, ApplicantList, ReviewByRecruiter

# create the app instance
app = Flask(__name__)
CORS(app)

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

# This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    # Here we blacklist particular JWTs that have been created in the past.
    return decrypted_token["jti"] in BLACKLIST


# The following callbacks are used for customizing jwt response/error messages for certain situations.
@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({"message": "The token has expired.", "error": "token_expired"}), 401


@jwt.invalid_token_loader
def invalid_token_callback(error):
    return (
        jsonify(
            {"message": "Signature verification failed.", "error": "invalid_token"}
        ),
        401,
    )


@jwt.unauthorized_loader
def missing_token_callback(error):
    return (
        jsonify(
            {
                "message": "Request does not contain an access token.",
                "error": "authorization_required",
            }
        ),
        401,
    )


@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return (
        jsonify(
            {"message": "The token is not fresh.",
                "error": "fresh_token_required"}
        ),
        401,
    )


@jwt.revoked_token_loader
def revoked_token_callback():
    return (
        jsonify(
            {"message": "The token has been revoked.", "error": "token_revoked"}
        ),
        401,
    )


# user authentication
api.add_resource(UserRegister, "/register")
api.add_resource(User, "/user/<string:username>")
api.add_resource(UserLogin, "/login")
api.add_resource(TokenRefresh, "/refresh")
api.add_resource(UserLogout, "/logout")

# applicant endpoints
api.add_resource(SubmitApplication, "/apply")
api.add_resource(ApplicantApplications, "/myapplist")
api.add_resource(JobPostList, "/jobposts/<string:industry>")
api.add_resource(ReviewByApplicant, "/reviewapp")


# recruiter endpoints
api.add_resource(PostJob, "/post")
api.add_resource(RecruiterJobPostingList, "/recruiterposts")
api.add_resource(ApplicantList, "/applicantlist/<string:job_post_id>")
api.add_resource(ReviewByRecruiter, "/recruiterdecision/<string:app_id>")


@app.route("/")
def home():
    return "Hello world"


if __name__ == "__main__":
    app.run(port=5000, debug=True)
