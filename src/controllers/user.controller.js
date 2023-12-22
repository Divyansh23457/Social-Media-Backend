import express from "express"
import {UserModel} from "../models/index.model.js"
import  UserRepository  from "../Repositories/user.Repository.js";
import bcrypt from "bcrypt"
export default class userController{

    constructor(){
        this.userRepository = new UserRepository() 
    }

    signup = async(req,res,next) =>{
        const {username , password , email , fullName} = req.body;
        console.log(req.body.fullName)
        if(!password || !username || !email || !fullName) {
            return res.status(400).send("Please provide all the mandatory details.")
        }
        try{
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await this.userRepository.signup({username , email , fullName , password:hashedPassword})
            if(!newUser){
                throw new Error("Error while creating Account")
            }
            return res.status(201).json(newUser)
            
        }catch(err){
            console.log(err)
            return res.status(500).send("Error while creating Account")
        }
    }
    signin = (req,res,next) =>{}
    logout = (req,res,next) =>{}
    logoutAll = (req,res,next) =>{}
    
}