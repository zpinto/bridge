from flask_restful import Resources, reqparse
from db import db, collection_names

# /my_posting_list
class RecruiterJobPostingList(Resource):
    # get all job postings by recruiter
    pass
    
# /post_job
class PostJob(Resource):
    pass

# /view_applicants
class ApplicantList(Resource):
    # get applicants that applied to a post
    pass

class ReviewByRecruiter(Resource):
    # /get_applicant
    def get():
        pass


    # /review_applicant
    def post():
        pass