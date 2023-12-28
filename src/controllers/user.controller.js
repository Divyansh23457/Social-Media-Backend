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
                //cloudinaryResponse = await cloudinaryUploadFile(req.file.path)
                console.log("Cloudinary Response -> " + JSON.stringify(cloudinaryResponse))
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await this.userRepository.signup({username : name , email , gender , password:hashedPassword ,profilePicture : cloudinaryResponse? cloudinaryResponse.secure_url : undefined , imageCloudinaryPublicId:cloudinaryResponse.public_id })
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
                const token = jwt.sign(
                    user
                , process.env.SECRETT)
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
    logout = (req,res,next) =>{
        req.session = null
        res.clearCookie('jwtToken')
        return res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
    }
    logoutAll = (req,res,next) =>{
        req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
              res.status(500).send('Internal Server Error');
            } else {
              res.status(200).send('Logged out from all devices');
            }
          });
    }
    async getUserById(req,res){
        const {userId} = req.params;
        try{
            const result = await this.userRepository.getUser(userId)
            if(result){
                return res.status(200).json({
                    success:true,
                    user : result
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:"User could not be found"
                })
            }

        }catch(err){
            console.log(err)
            console.log("Error while fetching user by user Id")
        }
    }

    async getAllUsers(req,res){
        try{
            const users = await this.userRepository.getAllUsers()
            if(users){
                return res.status(200).json(
                    users
                )
            }else{
                return res.status(400).json({
                    success:false,
                    message:"Some error occured while fetching..."
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while fetching the users")
        }
    }
    async updateDetails(req,res){
        const userId = req.userId   
        console.log(userId)
        try{
            const user = await this.userRepository.getUser(userId)
            
            if(!user ){
                return res.status(400).json({
                    success:false,
                    message:"User Invalid or UnAuthorized"
                })
            }
            const {username , email ,gender} = req.body;
            const result = await this.userRepository.updateUserDetails({username , email ,gender , userId})
            return res.status(200).json({
                success:true,
                updatedUser : result
            })
        }catch(err){
            // console.log(err)
            console.log("Error while updating user details")
        }
    }
}
