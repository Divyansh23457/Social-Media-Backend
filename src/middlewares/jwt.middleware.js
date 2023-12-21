import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

export const jwtAuth = (req,res,next) =>{
    const token = req.headers['Authorization']
    console.log(token)
    if(!token){
        return res.status(401).send("Session expired.Please login again.")
    }
    try{
        const payload = jwt.verify(
            token,
            process.env.SECRETT
        )
        req.userId = payload.userId
    }catch(err){
        console.log(err)
        return res.status(401).send("Authentication Failed")
    }
    next()
}