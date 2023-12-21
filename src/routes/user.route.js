import express from "express"
import {signup , signin , logout , logoutAll} from '../controllers/user.controller.js'
const userRouter = express.Router()


userRouter.get('/signup' , (req,res,next)=> signup(req,res,next) )
userRouter.get('/signin' , (req,res,next)=> signin(req,res,next) )
userRouter.get('/logout' , (req,res,next)=> logout(req,res,next))
userRouter.get('/logout-all-devices' , (req,res,next)=> logoutAll(req,res,next))

export default userRouter