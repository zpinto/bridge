import Socket from "../util/Socket";
import { applicantEPs } from "../Config.json";

const { applyEP, myapplistEP, reviewappEP } = applicantEPs;

async function apply(resume_id, job_post_id){
    const payload = {
        resume_id: resume_id,
        job_post_id: job_post_id
    };

    return await Socket.POST(applyEP, payload);
}

async function myapplist(previous_doc){
    const payload = {
        previous_doc: previous_doc
    };

    return await Socket.GET(myapplistEP, payload)
}

async function reviewapp(){
    const payload = {

    };

    return await Socket.POST(reviewappEP, payload);
}


export default{
    apply,
    myapplist,
    reviewapp
};