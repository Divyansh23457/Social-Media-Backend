import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const url = process.env.DB_URL
let client

export const connectToDatabase = async() =>{
   try{
        await mongoose.connect(url)
        console.log("MongoDB connected successfully")
   }catch(err){
        console.log("Error while connecting to database")
   }
                  
}








