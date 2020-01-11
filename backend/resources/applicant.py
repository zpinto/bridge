import traceback

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
            return {"applications": {application.id for application in cursor}}, 200

        except:
            traceback.print_exc()
            return {"message": "Error fetching applications"}, 500


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
            job_applications = db.collection(
                collection_names["JOB_APPLICATIONS"]).order_by("job_id")

            if data["previous_doc"]:
                job_applications = job_applications.start_after(
                    data["previous_doc"])

            job_applications = job_applications.limit(1).stream()

            # I assumed this takes care of null case
            job_app = {app.id for app in job_applications}
            return {"application": job_app}, 200

        except:
            return {"message": "Failed to get applications"}, 500

    @jwt_required
    def post(self):
        data = ReviewByApplicant._req_parser.parse_args()

        try:
            doc_ref = db.collection(
                collection_names["JOB_APPLICATIONS"]).document(data['app_id'])
            new_value = doc_ref.to_dict()
            new_value["yes"].append(
                get_jwt_identity) if data['decision'] else new_value["no"].append(get_jwt_identity)
            doc_ref.set(new_value)
            return {"message": "Successfully reviewed application"}, 200

        except:
            return {"message": "Failed to review application"}, 500


# /job_posts
class JobPostList(Resource):

    @jwt_required
    def get(self, job_type):
        data = JobPostList._req_parser.parse_args()

        try:
            job_posts = db.collection(
                collection_names["JOB_POSTS"]).where("job_type", "==", job_type).stream()
            job_posts = {post.id for post in job_posts}

            return {"posts": job_posts}, 200

        except:
            return {"message": "There was an error looking up the job list"}


# /apply
class SubmitApplication(Resource):
    _app_parser=reqparse.RequestParser()
    _app_parser.add_argument(
        "resume_id", type = str, required = True
    )
    _app_parser.add_argument(
        "job_post_id", type = str, required = True
    )

    @jwt_required
    def post(self):
        data=SubmitApplication._app_parser.parse_args()
        data['applicant_username']=get_jwt_identity()
        data['yes']=[]
        data['no']=[]

        try:
            job_app=db.collection(
                collection_names["JOB_APPLICATIONS"]
            ).document()
            job_app.set(data)
            return {"message": "Application submitted successfully!"}, 201
        except:
            return {"message": "Error submitting application"}, 500
