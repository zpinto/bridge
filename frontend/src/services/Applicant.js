import Socket from "../util/Socket";
import { applicantEPs } from "../Config.json";

const { applyEP, myapplistEP, jobpostsEP, reviewappEP } = applicantEPs;

async function apply(resume_id, job_post_id) {
  const payload = {
    resume_id: resume_id,
    job_post_id: job_post_id
  };

  return await Socket.POST(applyEP, payload);
}

async function myAppList() {
  return await Socket.GET(myapplistEP);
}

async function jobPosts() {
  return await Socket.GET(jobpostsEP);
}


async function getAppToReview() {
  return await Socket.GET(reviewappEP);
}

async function reviewApp(decision, app_id) {
  const payload = {
    decision,
    app_id
  };

  return await Socket.POST(reviewappEP, payload);
}

export default {
  apply,
  myAppList,
  jobPosts,
  getAppToReview,
  reviewApp
};
