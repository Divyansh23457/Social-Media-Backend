import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

const jwtAuth = (req,res,next) =>{
    const {jwtToken} = req.cookies;
    console.log(jwtToken)
    if(!jwtToken){
        return res.status(401).send("Session expired.Please login again.")
    }
    try{
        const payload = jwt.verify(
            jwtToken,
            process.env.SECRETT
        )
        req.userId = payload._id
        req.user = payload.user
    }catch(err){
        console.log(err)
        return res.status(401).send("Authentication Failed")
    }
    next()
}

export default jwtAuth