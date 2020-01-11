from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    fresh_jwt_required,
)

from db import db, collection_names

# /my_application_list
class ApplicantApplications(Resource):
    _req_parser = reqparse.RequestParser()
    _req_parser.add_argument(
        "user_id", type = str, required = True 
    )
    _req_parser.add_argument(
        "previous_doc", type = dict
    )
    
    @jwt_required
    def get(self){
        data = ApplicantApplications._req_parser.parse_args()

        try:
            user_applications = db.collection(collection_names["JOB APPLICATION"])
                                  .where("user_id", "==", data["user_id"])
                                  .limit(to: 10)
                                  .start(after: data["previous_doc"])

            return {"applications" : [application.to_dict() for application in user_applications]}, 200

        except:
            return {"message": "Error fetching applications"}, 500
    }
    


class ReviewByApplicant(Resource):
    _req_parser = reqparse.RequestParser()
    _req_parser.add_argument(
        "decision", type = int
    )
    _req_parser.add_argument(
        "previous_doc", type = dict
    )

    # /get_application
    def get(self):
        data = ReviewByApplicant._req_parser.parse_args()

        try:
            job_applications = db.collection(collection_names["JOB_APPLICATIONS"])
                                 .get()
                                 .limit(to: 1)
                                 .start(after: data["previous_doc"])
            return {"applications": [app for app in job_applications]}, 200

        except:
            return {"message": "Failed to get applications"}, 500


    # /review_application
    def post(self):
        data = ReviewByApplicant._req_parser.parse_args()

        try:
            doc_ref = db.collection(collection_names["JOB_APPLICATIONS"]) # needs to get by app id
            new_value = doc_ref.to_dict()
            # yes == 1, no == -1
            new_value["_score"] += data["decision"]
            doc_ref.set(new_value)


            return {"message": "Successfully reviewed application"}, 200

        except:
            return {"message": "Failed to review application"}, 500


# /job_posts
class JobPostList(Resource):

    # @jwt_required
    def get(self, job_type: str):
        job_posts_collection = db.collection(collection_names["JOB_POSTS"])

        # For more memory efficient way
        # https://cloud.google.com/firestore/docs/query-data/query-cursors
        jobs_of_job_type = job_posts_collection.where(
            "job_type", "==", job_type).stream()
        return {"Posts": [doc.to_dict() for doc in docs]}, 200


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
