const mysqlpool = require("../config/db");
const { getCredentialFromToken } = require("../utils/checkAuth");
const { loadUserByUserName } = require("./authControler");


const createJob = async (req, res) => {
    try {
        const decodedToken = getCredentialFromToken();
        const [[employer]] = await loadUserByUserName(decodedToken.username, "employer");

        const { experince_required, location, job_type, sallery_min, sallery_max, discription, skill } = req.body;
        const [result] = await mysqlpool.execute("insert into job(experince_required,location,job_type,sallery_min,sallery_max,discription) values (?,?,?,?,?,?)", [experince_required, location, job_type, sallery_min, sallery_max, discription]);
        const lastInsertedId = result.insertId;
        console.log("last inserted id", lastInsertedId)
        console.log("employer", employer)
        await mysqlpool.execute("insert into employer_job(job_id,employer_id) values(?,?)", [lastInsertedId, employer.employer_id]);
        res.status(201).send({
            message: "job posted successfull"
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error",
            err
        })
    }

}

const getAllJobs = async (req, res) => {
    try {
        const [jobs] = await mysqlpool.query("select * from job");
        console.log(jobs);
        res.status(200).send({
            jobs
        })
    } catch (err) {
        res.status(500).send({
            message: "something went wrong pls. try after sometimes"
        })
    }

}

const getJobById = async (req, res) => {
    try {
        const { jobId } = req.params;
        const [[job]] = await mysqlpool.execute("select * from job where job_id=?", [jobId])
        res.status(200).send({ job })
    } catch (err) {
        res.status(500).send({
            message: "something went wrong pls. try after sometime"
        })
    }

}

const getJobsByEmployer = async (req, res) => {
    try {
        const decodedToken = getCredentialFromToken();
        const [[employer]] = await loadUserByUserName(decodedToken.username, "employer");
        const [jobsId] = await mysqlpool.execute("select * from  employer_job where employer_id=? ", [employer.employer_id]);

            let jobs=[]
            for(let i=0;i<jobsId.length;i++){
                let [[result]]=await mysqlpool.execute("select * from job where job_id=?", [jobsId[i].job_id]);
                jobs.push(result)
            }
            

        // await mysqlpool.execute("delete from job where job_id=?",[jobId]);
        console.log(jobs)
        res.status(200).send({
            jobs
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error",
            err
        })
    }

}

const getJobsByLocation = async (req, res) => {
    try {
        const { location } = req.params
        const [jobs] = await mysqlpool.execute("select * from job where location=?", [location])
        res.status(200).send({ jobs })
    } catch (err) {
        res.status(500).send({
            message: "something went wrong pls. try after sometime"
        })
    }
}




const deleteJobByJobId = async (req, res) => {
    try {
        const decodedToken = getCredentialFromToken();
        const [[employer]] = await loadUserByUserName(decodedToken.username, "employer");
        const { jobId } = req.params;
        await mysqlpool.execute("delete from  employer_job where employer_id=? and job_id=?", [employer.employer_id, jobId])
        await mysqlpool.execute("delete from job where job_id=?", [jobId]);
        res.status(200).send({
            message: `${jobId} job is deleted successfully`
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "internal server error",
            err
        })
    }

}



module.exports = { createJob, getAllJobs, getJobById, getJobsByEmployer, getJobsByLocation, deleteJobByJobId }