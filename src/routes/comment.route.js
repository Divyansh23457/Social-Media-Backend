import express from "express"

const commentRouter = express.Router()



commentRouter.get('/' , (req,res)=> res.send("adw"))


export default commentRouter