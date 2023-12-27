import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

const jwtAuth = (req,res,next) =>{
    const {jwtToken ,isVerified} = req.cookies;
    // console.log(jwtToken)
    if(!jwtToken){
        return res.status(401).send("Session expired.Please login again.")
    }
    try{
        const payload = jwt.verify(
            jwtToken,
            process.env.SECRETT
        )
        // console.log("Payload =>" + JSON.stringify(payload))
        req.userId = payload._doc._id
        req.user = payload._doc
        req.isVerified = isVerified
        
        //  console.log(isVerified)
        // console.log(req.userId , "    . .. . " + req.user)
        
    }catch(err){
        console.log(err)
        return res.status(401).send("Authentication Failed")
    }
    next()
}

export default jwtAuth

 