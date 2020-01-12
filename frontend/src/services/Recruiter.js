import Socket from "../util/Socket";
import {
  recruiterEPs
} from "../Config.json";

const {
  postEP,
  recruiterpostsEP,
  recruiterdecisionEP,
  applicantlistEP
} = recruiterEPs;


async function postJob(title, deadline, industry, job_description, company_description) {
  const payload = {
    title,
    deadline,
    industry,
    job_description,
    company_description
  };

  return await Socket.POST(postEP, payload);
}

async function recruitersPosts() {
  return await Socket.GET(recruiterpostsEP);
}

async function recruiterDecision(app_id, decision) {
  return await Socket.POST(recruiterdecisionEP + app_id, decision);
}

async function applicantList(job_post_id) {
  return await Socket.GET(applicantlistEP + job_post_id);
}

export default {
  postJob,
  recruitersPosts,
  recruiterDecision,
  applicantList
};