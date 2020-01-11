from google.cloud import firestore

db = firestore.Client()
collection_names = {"USERS": "users", 
                    "JOB_POSTS": "job_posts", 
                    "JOB_APPLICATIONS": "job_applications"}

def create(collection_name, id, data):
    db.collection(collection_name).document(id).set(data)

def read(collection_name, id):
    return db.collection(collection_name).document(id).get()

def update(collection_name, id, new_value):
    db.collection(collection_name).document(id).update(new_value)

def delete(collection_name, id):
    db.collection(collection_name).document(id).delete()

def where(collection_name, key, operation, value):
    return db.collection(collection_name).where(key, operation, value)