import {UserModel} from '../models/index.model.js'

export default class UserRepository{
    async signup(userData) {
        const newUser = new UserModel(userData)
        try{
            await newUser.save()
            return newUser;
            
        }catch(err){
            console.log(err)
            console.log("Error while creating user ")
        }
    }
}