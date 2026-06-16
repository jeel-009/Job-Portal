import { Company } from "../models/company.model.js";
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/caludinary.js';

export const registerCompany = async (req, res) => {
    try {
        let { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: 'company name is required',
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) { //already extis
            return res.status(400).json({
                message: "Company is Already exits",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id  // middleware se aayega
        })

        return res.status(201).json({
            message: "Company register succesfully!",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId })
        if (!company) {
            return res.status(404).json({
                message: "Company is not exits",
                success: false
            });
        }
        return res.status(200).json({
            company,
            message: "Companies fetched successfully", // ✅ yahan add karo
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        let companyId = req.params.id;
        let company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company is not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        let { name, description, website, location } = req.body;
        let logo;
        if (req.file) {
            const fileUri = getDataUri(req.file); // buffer to uri
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        // console.log(name, description, website, location)
        let updateData = { name, description, website, location, logo }
        // console.log(updateData)
        let company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })
        return res.status(200).json({
            company,
            message: "Company updated successfully", // ✅ yeh add karo
            success: true
        })
        if (!company) {
            return res.status(404).json({
                message: "Company is not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }

}

