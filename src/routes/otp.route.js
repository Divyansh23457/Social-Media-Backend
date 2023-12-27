import express from "express"
import jwtAuth from "../middlewares/jwt.middleware.js"
import OtpController from "../controllers/otp.controller.js"

const otpRouter = express.Router()
const otpController = new OtpController()



otpRouter.post('/send' , jwtAuth , (req,res)=> otpController.sendOtp(req,res))
otpRouter.post('/verify' , jwtAuth , (req,res)=> otpController.verifyOTP(req,res))
otpRouter.post('/reset-password' , jwtAuth , (req,res)=> otpController.resetPassword(req,res))


export default otpRouter