import { Job } from "../models/job.model.js";

//for student
export const postJob = async (req, res) => {
    try {
        let { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId } = req.body;
        let userId = req.id;
        if (!title || !description || !requirements || !salary || !experienceLevel || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: 'something is mmissing',
                success: false
            })
        }
        const jobs = await Job.create({
            title,
            description,
            requirements,
            salary,
            experienceLevel,
            location,
            jobType,
            position,
            companyId,
            created_by: userId
        })
        return res.status(200).json({
            message: "Job posted successfully!",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
//for student
export const getAllJobs = async (req, res) => {
    try {
        //filter jobs
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        let jobs = await Job.find(query).populate({path:"companyId"}).sort({createdAt:-1})
        

        if (!jobs) {
            return res.status(404).json({
                message: 'Job Not Found',
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}
//for student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        let jobs = await Job.findById(jobId).populate({
                path: "application",
                populate: {
                    path: "applicant"
                }
            });
        if (!jobs) {
            return res.status(404).json({
                message: 'Job Not Found',
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

//for recruiter
export const getAdminJobs = async (req, res) => {
    try {
        const userId = req.id;
const jobs = await Job.find({ created_by: userId }).populate('companyId');
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: 'Job Not Found',
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// export const updateJob = async (req, res) => {
//     try {
//         const { title, description, requirements, salary,
//             experienceLevel, location, jobType, position } = req.body;

//         const jobId = req.params.id;
//         let updateData = {
//             title, description, requirements, salary,
//             experienceLevel, location, jobType, position
//         };
//         let updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true })
//         if (!updatedJob) {
//             return res.status(404).json({
//                 message: 'Job Not Found',
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             updatedJob,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);

//     }

// }
