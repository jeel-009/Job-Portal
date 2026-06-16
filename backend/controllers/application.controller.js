import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        if (!jobId) {
            return res.status(400).json({
                message: 'Job Id is require',
                success: false
            })
        }
        //check user already applied for this job
        const exitingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (exitingApplication) {
            return res.status(400).json({
                message: 'User is already exits',
                success: false
            })
        }
        //if job is exits
        let job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: 'Job Not Found',
                success: false
            })
        }
        let newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.application.push(newApplication._id);
        await job.save()
        res.status(200).json({
            message: 'job applied succesfully',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
    message: "Server error",
    success: false
});
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'companyId'
                }
            })
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: 'application Not Found',
                success: false
            })
        }
        res.status(200).json({
            applications, success: true
        })

    } catch (error) {
        console.log(error);

    }
}

//recruiter saw how many application is get
export const gatApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applications = await Application.find({ job: jobId })
    .populate({ path: 'applicant' })  // ← sirf applicant
    .populate({ path: 'job' });       // ← job bhi add karo
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                message: 'application Not Found',
                success: false
            })
        }
        return res.json({ applications, success: true })
    } catch (error) {
        console.log(error);

    }
}

export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: 'status is require',
                success: false
            })
        }
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: 'application is not Found',
                success: false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        res.status(200).json({
            message: 'status updated  succesfully',
            application,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}