import mongoose from "mongoose";
import { Job } from "./job.model.js";
import { application } from "express";

const applicationSchema = new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },

    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    status:{
        type:String,
        enum:['pending', 'accepted', 'rejected'],
        default:'pending'
    }
},{timestamps:true});

export const Application = mongoose.model("Application",applicationSchema);
