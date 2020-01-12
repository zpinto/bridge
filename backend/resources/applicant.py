import traceback

from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    fresh_jwt_required,
)

from db import db, collection_names


# /apply
class SubmitApplication(Resource):
    _app_parser = reqparse.RequestParser()
    _app_parser.add_argument(
        "resume_id", type=str, required=True
    )
    _app_parser.add_argument(
        "job_post_id", type=str, required=True
    )

    @jwt_required
    def post(self):
        data = SubmitApplication._app_parser.parse_args()
        data['applicant_username'] = get_jwt_identity()
        data['yes'] = []
        data['no'] = []

        try:
            job_app = db.collection(
                collection_names["JOB_APPLICATIONS"]
            ).document()
            job_app.set(data)
            return {"message": "Application submitted successfully!"}, 201
        except:
            return {"message": "Error submitting application"}, 500


# /myapplist
class ApplicantApplications(Resource):
    _req_parser = reqparse.RequestParser()
    _req_parser.add_argument(
        "previous_doc", type=dict
    )

    @jwt_required
    def get(self):
        data = ApplicantApplications._req_parser.parse_args()

        try:
            user_applications = db.collection(collection_names["JOB_APPLICATIONS"]).where(
                "applicant_username", "==", get_jwt_identity())
            cursor = user_applications.order_by("job_post_id")

            if data["previous_doc"]:
                cursor = cursor.start_after(data["previous_doc"])

            cursor = cursor.limit(5).stream()
            return {"applications": [dict(app_id=app.id, **app.to_dict()) for app in cursor]}, 200

        except:
            traceback.print_exc()
            return {"message": "Error fetching applications"}, 500

# /reviewapp
class ReviewByApplicant(Resource):
    _req_parser = reqparse.RequestParser()
    _req_parser.add_argument(
        "app_id", type=str
    )
    _req_parser.add_argument(
        "decision", type=int
    )
    _req_parser.add_argument(
        "previous_doc", type=dict
    )

    @jwt_required
    def get(self):
        data = ReviewByApplicant._req_parser.parse_args()

        try:
            job_app_collection = db.collection(
                collection_names["JOB_APPLICATIONS"]).order_by("job_post_id")

            if data["previous_doc"]:
                job_app_collection = job_app_collection.start_after(
                    data["previous_doc"])

            job_app_stream = job_app_collection.limit(1).stream()

            # I assumed this takes care of null case
            job_app = [dict(id=app.id, **app.to_dict()) for app in job_app_stream]
            return {"application": job_app}, 200
        
        except:
            return {"message": "Failed to get applications"}, 500

    @jwt_required
    def post(self):
        data = ReviewByApplicant._req_parser.parse_args()

        try:
            doc_ref = db.collection(
                collection_names["JOB_APPLICATIONS"]).document(data['app_id'])
            new_value = doc_ref.get().to_dict()
            print(new_value)

            new_value["yes"].append(
                get_jwt_identity()) if data['decision'] else new_value["no"].append(get_jwt_identity())
            
            doc_ref.set(new_value)

            print(doc_ref.get().to_dict())
            return {"message": "Successfully reviewed application"}, 200

        except:
            traceback.print_exc()
            return {"message": "Failed to review application"}, 500


# /jobposts
class JobPostList(Resource):

    @jwt_required
    def get(self, job_type):
        try:
            job_posts_query = db.collection(collection_names["JOB_POSTS"]).where("job_type", "==", job_type)

            job_posts = [dict(post_id=post.id, **post.to_dict()) for post in job_posts_query.stream()]


            return {"posts": job_posts}, 200

        except:
            return {"message": "There was an error looking up the job list"}
