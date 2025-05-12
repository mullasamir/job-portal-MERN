import { Company } from "../models/company.model.js";

export const resgisterCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Registered Successfully..",
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(400).json({
                message: "companies not found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            message: "companies found",
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}

export const getCompanyById = async (req, res) => {
    try {

        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            message:"Company found",
            success: true
            
        })
    } catch (error) {
        console.log(error)
    }
}

export const updataCompany = async (req, res) => {

    try {
        const { name, description, website, locaion } = req.body;
        const file = req.file;

        const updateData = { name, description, website, locaion };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({

                message: "Company Not Found",
                success: false
            })
        };

        return res.status(200).json({
            message: "Company information updated",
            success: true
        })



    } catch (error) {
        console.log(error)
    }
}