from flask_restful import Resource
from db import db, collection_names

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    fresh_jwt_required,
)

class JobPosts(Resource):
    
    #@jwt_required
    def get(self, job_type):
        job_posts_collection = db.collections(collection_names["JOB_POSTS"])
        

