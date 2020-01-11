from flask_restful import Resources, reqparse
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
    
    #@jwt_required
    def get(self, job_type : str):
        job_posts_collection = db.collection(collection_names["JOB_POSTS"])

        # For more memory efficient way
        # https://cloud.google.com/firestore/docs/query-data/query-cursors
        jobs_of_job_type = job_posts_collection.where("job_type", "==", job_type).stream()
        return {"response": [doc.to_dict() for doc in docs]}, 200


# /apply_to_jobs
class SubmitApplication(Resource):
    _app_parser = reqparse.RequestParser()
    _app_parser.add_argument(
        "resume_id", type=str, required=True
    )
    _app_parser.add_argument(
        "job_post_id", type=str, required=True
    )
    _app_parser.add_argument(
        "user_id", type=str, required=True
    )
    
    def post(self):
        data = _app_parser.parse_args()
        job_app_collection = db.collections(collection_names["JOB_APPLICATIONS"])  
        job_app_collection.document().set(data)