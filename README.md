## API Documentation

Look at PostMan requests for examples

Link: https://learn-flask-restful.herokuapp.com/

- [UserRegister](#UserRegister)
- [User](#User)
- [UserLogin](#UserLogin)
- [TokenRefresh](#TokenRefresh)
- [UserLogout](#UserLogout)
- [SubmitApplication](#SubmitApplication)
- [ApplicantApplications](#ApplicantApplications)
- [PostJob](#PostJob)
- [RecruiterJobPostingList](#RecruiterJobPostingList)
- [ApplicantList](#ApplicantList)
- [ReviewByRecruiter](#ReviewByRecruiter)

### UserRegister

**POST /register**

Create user

```
BODY:

"username":                 : String # required
"password":                 : String # required
"first_name":               : String # required
"last_name":                : String # required
"user_type":                : String # required

RETURNS:

"message":                  : String, was creation successful?
```

## User

**GET /user/<string:username>**

Get user

```
PARAMS:

"username":                 : String # required

RETURNS:

"username":                 : String
"password":                 : String
"first_name":               : String
"last_name":                : String
"user_type":                : String
```

**DELETE /user/<string:username>**

Get user

```
PARAMS:

"username":                 : String # required

RETURNS:

"message":                  : String, was deletion successful?
```

### UserLogin

**POST /login**

Login to existing user

```
BODY:

"username":                 : String # required
"password":                 : String # required

RETURNS:

"message":                  : String, was logged in successful?
```

### TokenRefresh

**POST /refresh**

Refresh access_token for current user

```
HEADERS:

"Authorization":            : String # required, refresh_token

RETURNS:

"access_token":             : String, JWT access_token
```

### UserLogout

**POST /logout**

Logout of current user

```
HEADERS:

"Authorization":            : String # required, access_token

RETURN:

"message"                   : String, was logged out successful?
```

### SubmitApplication

**POST /apply**

Applicant applies

```
HEADERS:

"Authorization":            : String # required, access_token

BODY:

"resume_id":                : String # required
"job_post_id":              : String # required

RETURN:

"message"                   : String, application submitted successfully?
```

### ApplicantApplications

**GET /myapplist**

List of all the applicants applications

```
HEADERS:

"Authorization":            : String # required, access_token

BODY:

"previous_doc":             : String # required

RETURN:

"applications":             : Dict of dicts
```

### ApplicantApplications

**GET /myapplist**

List of all the applicants applications

```
HEADERS:

"Authorization":            : String # required, access_token

BODY:

"previous_doc":             : String # required

RETURN:

"applications":             : Dict of dicts
```

### PostJob

**POST /post**

Creates a job post

```
HEADERS:

"Authorization":            : String # required, access_token

BODY:

"title":                    : String # required
"deadline":                 : String # required
"job_description":          : String # required
"company_description":      : String # required
"job_type":                 : String # required

RETURN:

"message":                  : Job posted successfully?
```

### RecruiterJobPostingList

**GET /recruiterposts**

Gets list of job postings the recruiter owns

```
HEADERS:

"Authorization":            : String # required, access_token

RETURN:

"posts":                    : Dict of dicts
```

### ApplicantList

**GET /applicantlist/<string:job_post_id>**

```
HEADERS:

"Authorization":            : String # required, access_token

PARAMS:

"job_post_id":              : String # required

RETURN:

"posts":                    : Dict of dict
```

### ReviewByRecruiter

**POST /recruiterdecision/<string:app_id>**

```
HEADERS:

"Authorization":            : String # required, access_token

PARAMS:

"app_id":                   : String # required

BODY:

"decision":                 : String # required

RETURN:

"message":                  : String, Selection successful?
```

**GET /recruiterdecision/<string:app_id>**

```
HEADERS:

"Authorization":            : String # required, access_token

PARAMS:

"app_id":                   : String # required

RETURN:

"resume_id":                : String # required
"job_post_id":              : String # required
```
