import mongoose from "mongoose"

const otpSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    otpSecret:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const OtpModel = mongoose.model("Otp" , otpSchema)
export default OtpModel