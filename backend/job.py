class JobApplication:
    def __init__(self, resume, job_post_id, user_id):
        self._resume = resume
        self._job_post_id = job_post_id
        self._user_id = user_id  

class JobPost:
    def __init__(self, job_type, job_post_id, company_name, qualifications):
        self._job_type = job_type
        self._job_post_id = job_post_id
        self._company_name = company_name
        self._qualifications = qualifications  