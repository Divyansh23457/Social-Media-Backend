import {UserModel} from '../models/index.model.js'
import mongoose from "mongoose"
import bcrypt from "bcrypt"



export default class UserRepository{
    async signup(userData) {
        const newUser = new UserModel(userData)
        try{
            await newUser.save()
            return newUser._doc;
        }catch(err){
            console.log(err)
            console.log("Error while creating user ")
        }
    }
    async signin(userData){
            const user = await UserModel.findOne({email : userData.email})
            const isPasswordCorrect = await bcrypt.compare(userData.password , user.password )
            if(!isPasswordCorrect){
                return res.status(400).send("Please enter valid credentials")
            }
            return {...user , password:undefined}
    }

    async getUser(id){
        const user = await UserModel.findById(id).select('-password')
        return user
    }

    async getAllUsers(){
        const users = await UserModel.find().select("username email gender posts profilePicture")
        return users;
    }

    async updateUserDetails(newUserDetails){
        const {userId , email , username , gender} = newUserDetails;
        try{
            const updatedUser = await UserModel.findByIdAndUpdate( userId, {
                $set:{
                    email , username , gender 
                }
            },{
                new : true
            })
           console.log(updatedUser)
            return updatedUser;
        }catch(err){
            // console.log(err)
            console.log("Error while updating user details")
        }
    }
}