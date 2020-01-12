from db import db, collection_names
import random

# def get_random_string():
#     string = '' 
#     num_of_chars = random.randint(10, 20)

#     for i in range(num_of_chars):
#         string += chr(random.randint(0, 127))

#     return string;

# # Users
# usernames = []

# for i in range(5):
#     data = dict()
    
#     usernames.append(get_random_string())

#     data['username'] = usernames[-1]
#     data['password'] = get_random_string()
#     data['first_name'] = get_random_string()
#     data['last_name'] = get_random_string()
#     data['user_type'] = ['applicant', 'recruiter'][random.randint(0,1)]
#     data['correct_reviews'] = 0
#     data['total_reviews'] = 0

#     db.collection(collection_names['USERS']).document().set(data)

# # job posts
# job_post_ids = []

# for i in range(5):
#     data = dict()

#     data['title'] = get_random_string()
#     data['deadline'] = get_random_string()
#     data['job_description'] = get_random_string()
#     data['company_description'] = get_random_string()
#     data['job_type'] = ['tech', 'sales'][random.randint(0, 1)]

#     doc_ref = db.collection(collection_names['JOB_POSTS']).document()
#     doc_ref.set(data)
#     job_post_ids.append(doc_ref.id)

# # job apps
# for i in range(10):
#     data = dict()
    
#     data['username'] = usernames[random.randint(0, len(usernames) - 1)]
#     data['resume_id'] = get_random_string()
#     data['job_post_id'] = job_post_ids[random.randint(0, len(job_post_ids) - 1)]
#     data['yes'] = []
#     data['no'] = []

#     db.collection(collection_names['JOB_APPLICATIONS']).document().set(data)

def print_documents(collection_name):
    for i in db.collection(collection_name).stream():
        print(i.to_dict())
    
    print()

# Do one at a time

# print_documents(collection_names['USERS'])
# print_documents(collection_names['JOB_POSTS'])
print_documents(collection_names['JOB_APPLICATIONS'])