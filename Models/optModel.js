import mongoose from "mongoose";
const otpSchema=mongoose.Schema({
    otp:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
        expires:"10m"
    }
})

const otpModel=mongoose.model('otp',otpSchema)

export default otpModel