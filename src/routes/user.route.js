import express from "express"
import userController from "../controllers/user.controller.js"

const userRouter = express.Router()
const UserController = new userController()

userRouter.post('/signup' , (req,res,next)=>UserController.signup(req,res,next) )
userRouter.post('/signin' , (req,res,next)=> UserController.signin(req,res,next) )
userRouter.post('/logout' , (req,res,next)=> UserController.logout(req,res,next))
userRouter.post('/logout-all-devices' , (req,res,next)=> UserController.logoutAll(req,res,next))

export default userRouter