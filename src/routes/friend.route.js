import express from "express"

const friendRouter = express.Router()



friendRouter.get('/' , (req,res)=> res.send("adw"))


export default friendRouter