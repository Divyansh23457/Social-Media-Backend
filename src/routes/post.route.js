import express from "express"
import PostController from "../controllers/post.controller.js"
import jwtAuth from "../middlewares/jwt.middleware.js"
import { upload } from "../middlewares/fileupload.middleware.js" 

const postRouter = express.Router()
const postController =new PostController()

postRouter.get('/' , jwtAuth , (req,res) => postController.getPostByUser(req,res))
postRouter.get('/all' , (req,res) => postController.getAllPosts(req,res))
postRouter.get('/:postId' , (req,res) => postController.getPostById(req,res))

postRouter.post('/' , jwtAuth , upload.single('imageUrl') , (req,res)=> postController.createPost(req,res))

postRouter.put('/:postId' , jwtAuth , upload.single('imageUrl') ,(req,res)=> postController.updatePost(req,res) )

postRouter.delete('/:postId' , jwtAuth , (req,res) => postController.deletePostById(req,res))

// postRouter.post('/' , (req,res,next) => r)

export default postRouter