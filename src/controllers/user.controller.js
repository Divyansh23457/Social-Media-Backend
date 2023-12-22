import express from "express"
import {UserModel} from "../models/index.model.js"
import  UserRepository  from "../Repositories/user.Repository.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { cloudinaryUploadFile } from "../Utils/cloudinary.utility.js";
dotenv.config()

export default class userController{

    constructor(){
        this.userRepository = new UserRepository() 
    }

    signup = async(req,res,next) =>{
        const {name , password , email , gender} = req.body;
        
        if(!password || !name || !email || !gender) {
            return res.status(400).send("Please provide all the mandatory details.")
        }
        try{
            let cloudinaryResponse
            if(req.file){
                cloudinaryResponse = await cloudinaryUploadFile(req.file.path)
                console.log("Cloudinary Response -> " + JSON.stringify(cloudinaryResponse))
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await this.userRepository.signup({username : name , email , gender , password:hashedPassword ,profilePicture : cloudinaryResponse? cloudinaryResponse.secure_url : undefined  })
            if(!newUser){
                throw new Error("Error while creating Account")
            }
            return res.status(201).json({...newUser , password : undefined})
            
        }catch(err){
            console.log(err)
            return res.status(500).send("Error while creating Account")
        }
    }
    signin = async(req,res,next) =>{
        const {email , password} = req.body;
        if(!email || !password) {
            return res.status(400).send("Please provide email and password for signing in")
        }
        try{
            const user = await this.userRepository.signin({email , password})
            if(user){
                // console.log("USER => " + user)
                const token = jwt.sign({
                    user,
                    _id : user._id
                }, process.env.SECRETT)
                return res.status(200)
                          .cookie("jwtToken", token , {
                            maxAge: 1 * 60 * 60 * 1000 , httpOnly : true
                          })
                          .json({
                            success:true,
                            token,
                            message:"You have logged in!"
                          })
            }
        }catch(err){
            console.log(err)
            console.log("Error while signing in")
            return res.status(400).send("Login Failed")
        }

    }
    logout = (req,res,next) =>{}
    logoutAll = (req,res,next) =>{}
    
}