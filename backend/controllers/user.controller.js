import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/caludinary.js";


export const register = async (req, res) => {
    try {


        let { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Somthing is Missing',
                success: false
            })
        }
        const file = req.file;

        let cloudResponse = null;

        if (file) {
            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );
        }
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exits',
                success: false
            })
        }
        let hasedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hasedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse?.secure_url
            }
            
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
        
    } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
}

}

export const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'somting went wrong',
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'incorrect email or password',
                success: false
            })
        }
        //check password
        const isPasswordisHash = await bcrypt.compare(password, user.password)
        if (!isPasswordisHash) {
            return res.status(400).json({
                message: "password is inccorect",
                success: false
            })
        }
        //check roles
        if (role !== user.role) {
            return res.status(400).json({
                message: "Dose't Exits with currnt roles",
                success: false
            })
        }
        const tokenData = {
            userId: user.id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000
}).json({
  message: `welcom back ${user.fullname}`,
  user,
  success: true
});




    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            message: 'Logged out successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        //for file
        const file = req.file;

        let cloudResponse = null;

        if (file) {
            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );
        }
        let skillsArry
        if (skills) {

            skillsArry = skills.split(',')
        }
        const userId = req.id; //middleware se ayegi
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            })
        }
        //update data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skillsArry) user.profile.skills = skillsArry
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }
        await user.save()

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.json({
            message: 'Profile is Updated',
            user,
            success: true
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        })
    }
}