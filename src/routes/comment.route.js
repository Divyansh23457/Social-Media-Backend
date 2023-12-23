import express from "express"
import CommentController from "../controllers/comment.controller.js"
import jwtAuth from "../middlewares/jwt.middleware.js"

const commentRouter = express.Router()
const commentController = new CommentController()


commentRouter.get('/:postId' , (req,res)=> commentController.getComments(req,res))

commentRouter.post('/:postId' , jwtAuth, (req,res)=>commentController.addComment(req,res))

commentRouter.put('/:commentId' , jwtAuth, (req,res)=>commentController.updateComment(req,res))

commentRouter.delete('/:commentId' ,jwtAuth, (req,res)=>commentController.deleteComment (req,res))

export default commentRouter