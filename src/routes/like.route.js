import express from "express"
import {LikeController} from '../controllers/index.controller.js'
import jwtAuth from '../middlewares/jwt.middleware.js'

const likeRouter = express.Router()
const likeController = new LikeController()


likeRouter.get('/:likeableId' , (req,res) => likeController.getLikes(req,res))
likeRouter.get('/toggle/:likeableId' , jwtAuth ,(req,res)=> likeController.toggleLike(req,res))


export default likeRouter