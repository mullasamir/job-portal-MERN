import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {

        const { title, description, requirements, salary, location, jobType, experience, positions, companyId } = req.body;

        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !positions || !companyId) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLavel: experience,
            positions,
            company: companyId,
            created_by: userId

        });

        return res.status(201).json({
            job,
            message: "New Job created",
            success: true
        })



    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            res.status(404).json({
                message: "Job not found",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Jobs NOt found",
                success: false
            })
        };

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs NOt found",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        });


    } catch (error) {
        console.log(error)
    }
}