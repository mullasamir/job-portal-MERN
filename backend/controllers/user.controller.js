import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "user already exist with this email",
                success: false

            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role

        });

        return res.status(201).json({
            message: "User created successfullyy...",
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}
export const login = async (req, res) => {


    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User does not exist check again...",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "User does not exist check again...",
                success: false
            })
        };

        if (role != user.role) {
            return res.status(400).json({
                message: "User role does not match check again...",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
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

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname, "!"}`,
            user,
            success: true
        })



    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Something is missing",
        //         success: false
        //     });
        // };

        //cloudinary will come heree
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        //update the data

        if(fullname) user.fullname = fullname
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(email) user.email = email
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
        // user.fullname = fullname,
        //     user.email = email,
        //     user.phoneNumber = phoneNumber,
        //     user.profile.bio = bio,
        //     user.profile.skills = skillsArray

        //resume comes laterr here..
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }


        return res.status(200).json({
            message:"updated successfullyy",
            user,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}