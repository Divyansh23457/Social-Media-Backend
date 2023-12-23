import LikeRepository from "../Repositories/like.Repository.js";
import {LikeModel} from '../models/index.model.js'

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository()
    }

    async getLikes(req,res){
        // const userId = req.userId;
        const LikeableId = req.params.likeableId;

        try{
            const likes = await this.likeRepository.getLikesRepo(LikeableId)
            if(!likes){
                return res.status(404).json({
                    sucess:false,
                    message:"Could not find the likes"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    likes
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while getting likes")
            return res.status(400).json({
                success:false,
                message:"Could not get likes for the post or comment"
            })
        }

    }

    async toggleLike(req,res){
        const likeableId = req.params.likeableId;
        const userId = req.userId;
        const type = req.query.type;
        const likeBody = {userId ,likeable :  likeableId , type}
        try{   
            const like = await LikeModel.findOne(likeBody)
            let result
            if(!like){
                console.log(likeBody)
                result = await this.likeRepository.createLike(likeBody)
            }else{
                likeBody.id = like._id;
                likeBody.isLiked = !like.isLiked
                result = await this.likeRepository.toggleLikeRepo(likeBody)
            }
            if(!result){
                res.status(400).json({
                    success:false,
                    message:"Could not toggle like"
                })
            }else{
                res.status(200).json({
                    success:true,
                    like : result
                })
            }

        }catch(err){
            console.log(err)
            console.log("Error while toggling like")
            return res.status(400).json({
                success:false,
                message:"Could not get likes for the post or comment"
            })
        }
    }
}