import traceback

from flask_restful import Resource, reqparse
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    fresh_jwt_required,
)

from db import db, collection_names


class PostJob(Resource):
    _post_parser = reqparse.RequestParser()
    _post_parser.add_argument(
        "title", type=str, required=True
    )
    _post_parser.add_argument(
        "deadline", type=str, required=True
    )
    _post_parser.add_argument(
        "job_description", type=str, required=True
    )
    _post_parser.add_argument(
        "company_description", type=str, required=True
    )
    _post_parser .add_argument(
        "industry", type=str, required=True
    )

    @jwt_required
    def post(self):
        data = PostJob._post_parser.parse_args()
        data['poster_username'] = get_jwt_identity()

        try:
            job_post = db.collection(
                collection_names["JOB_POSTS"]
            ).document()
            job_post.set(data)
            return {"message": "Job posted successfully!"}, 201
        except:
            traceback.print_exc()
            return {"message": "Error submitting application"}, 500


class RecruiterJobPostingList(Resource):
    # get all job postings by recruiter
    @jwt_required
    def get(self):
        try:
            job_posts = db.collection(collection_names['JOB_POSTS']).where(
                "poster_username", "==", get_jwt_identity()).stream()
            return {"posts": {job_post.id: job_post.to_dict() for job_post in job_posts}}, 200
        except:
            traceback.print_exc()
            return {"message": "Error fetching postings"}


class ApplicantList(Resource):
    # get applicants that applied to a post
    @jwt_required
    def get(self, job_post_id):
        try:
            applicants = db.collection(collection_names['JOB_APPLICATIONS']).where(
                "job_post_id", "==", job_post_id).stream()
            # TODO: recalculate the score of the applicant based on users

            applicants_score = []

            for applicant in applicants:
                application = applicant.to_dict()
                score = 0

                for username in application['yes']:
                    user_ref = db.collection(
                        collection_names["USERS"]).document(username)

                    user = user_ref.get().to_dict()

                    score += 1 * (user['correct'] / user['score'])

                for username in application['no']:
                    user_ref = db.collection(
                        collection_names["USERS"]).document(username)

                    user = user_ref.get().to_dict()

                    score -= 1 * (user['correct'] / user['score'])

                application['score'] = score
                application['id'] = application[score]
                applicants_score.append(application)

            return {"applicants": sort(applicants, key=Ket)}, 200
        except:
            traceback.print_exc()
            return {"message": "Error fetching applicants"}


class ReviewByRecruiter(Resource):
    _review_parser = reqparse.RequestParser()
    _review_parser.add_argument(
        "decision", type=str, required=True
    )

    @jwt_required
    def get(self, app_id):
        try:
            application_ref = db.collection(
                collection_names['JOB_APPLICATIONS']).document(app_id)
            application = application_ref.get().to_dict()

            score = 0

            for username in application['yes']:
                user_ref = db.collection(
                    collection_names["USERS"]).document(username)

                user = user_ref.get().to_dict()

                score += 1 * (user['correct'] / user['reviewed'])

            for username in application['no']:
                user_ref = db.collection(
                    collection_names["USERS"]).document(username)

                user = user_ref.get().to_dict()

                score -= 1 * (user['correct'] / user['reviewed'])

            ret_application = application
            ret_application['score'] = score
            return ret_application, 200
        except:
            traceback.print_exc()
            return {"message": "Error fetching application"}

    # /review_applicant
    @jwt_required
    def post(self, app_id):
        data = ReviewByRecruiter._review_parser.parse_args()

        try:
            application_ref = db.collection(
                collection_names['JOB_APPLICATIONS']).document(app_id)
            application_ref.update({"decision": data['decision']})
            # TODO: need to update all of the users in that rated that application
            application = application_ref.get().to_dict()
            for username in application['yes']:
                user_ref = db.collection(
                    collection_names["USERS"]).document(username)

                user = user_ref.get().to_dict()

                if data['decision'] == 'yes':
                    user['correct'] += 1

                user['reviewed'] += 1
                user_ref.set(user)

            for username in application['no']:
                user_ref = db.collection(
                    collection_names["USERS"]).document(username)

                user = user_ref.get().to_dict()

                if data['decision'] == 'no':
                    user['correct'] += 1

                user['review'] += 1
                user_ref.set(user)

            return {"message": "Your selection was successful"}
        except:
            traceback.print_exc()
            return {"message": "Error making a decision on application"}
