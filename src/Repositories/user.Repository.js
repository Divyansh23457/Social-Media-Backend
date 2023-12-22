import {UserModel} from '../models/index.model.js'
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
}