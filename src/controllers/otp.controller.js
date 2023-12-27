import OtpModel from "../models/otp.model.js";
import UserModel from "../models/user.model.js";
import nodemailer from "nodemailer";
import { generateOTP, verifyOTP } from "../Utils/speakeasy.utility.js";
import bcrypt from "bcrypt"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "divyansh.dy@gmail.com",
    pass: process.env.GMAIL_APP_PASS,
  },
});

export default class OtpController {
  async sendOtp(req, res) {
    const { email } = req.user;
    const emailFromBody = req.body.email;

    if (email != emailFromBody) {
      return res.status(400).json({
        success: false,
        message: "Can only send otp for the logged in mail",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otpSecret = generateOTP();

    try {
      await OtpModel.findOneAndUpdate(
        { email },
        { otpSecret },
        { upsert: true }
      );

      const mailOptions = {
        from: "divyansh.dy@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is: ${otpSecret}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).json({ error: "Failed to send OTP" });
      });
      return res.json({ message: "OTP sent successfully" });
    } catch (err) {
      console.log(err);
      console.log("Error while sending OTP");
      return res.status(400).json({
        success: false,
        message: "Error while sending OTP",
      });
    }
  }

  async verifyOTP(req, res) {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Request parameters missing",
      });
    }

    try {
      const otpRecord = await OtpModel.findOne({ email });
      const otpSecret = otpRecord.otpSecret;

      const isVerified = otp == otpSecret;

      if (isVerified) {
        res.cookie("isVerified", true);
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Could not verify otp",
        });
      }
    } catch (err) {
      console.log(err);
      console.log("Error while verifying OTP.Please try again");
      return res.status(400).json({
        success: false,
        message: "Error while verifying OTP",
      });
    }
  }

  async resetPassword(req,res){
    
    const {email , newPassword} = req.body;
    // console.log(req.isVerified)
    if(!req.isVerified || req.isVerified == false){
      return res.status(400).json({
        success:false,
        message:"Can not reset password without verifying OTP"
      })
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    const newUser = await UserModel.findOneAndUpdate({email} , {
      password : hashedPassword
    },{
      new : true
    })
    if(!newUser){
      return res.status(400).json({
        success:false,
        message:"Could not find user"
      })
    }
    return res.status(200).json({
      success:true,
      newUser 
    })
  }
}
