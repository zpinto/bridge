from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    fresh_jwt_required,
)

from db import db, collection_names

# /my_application_list


class ApplicantApplications(Resource):
    # get all Job Applications according to user id
    pass


class ReviewByApplicant(Resource):
    # /get_application
    def get():
        pass

    # /review_application

    def post():
        pass


# /job_posts
class JobPostList(Resource):

    # @jwt_required
    def get(self, job_type: str):
        job_posts_collection = db.collection(collection_names["JOB_POSTS"])

        # For more memory efficient way
        # https://cloud.google.com/firestore/docs/query-data/query-cursors
        jobs_of_job_type = job_posts_collection.where(
            "job_type", "==", job_type).stream()
        return {"response": [doc.to_dict() for doc in docs]}, 200


# /apply
class SubmitApplication(Resource):
    _app_parser = reqparse.RequestParser()
    _app_parser.add_argument(
        "resume_id", type=str, required=True
    )
    _app_parser.add_argument(
        "job_post_id", type=str, required=True
    )

    # TODO: check to make sure that they are recruiter
    @jwt_required
    def post(self):
        data = SubmitApplication._app_parser.parse_args()
        data['applicant_username'] = get_jwt_identity()

        try:
            job_app = db.collection(
                collection_names["JOB_APPLICATIONS"]
            ).document()
            job_app.set(data)
            return {"message": "Application submitted successfully!"}, 201
        except:
            return {"message": "Error submitting application"}, 500
