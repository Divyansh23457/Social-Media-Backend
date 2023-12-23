import {LikeModel} from "../models/index.model.js";
import {ObjectId} from 'mongodb'

export default class LikeRepository{
    async getLikesRepo(likeableId){
        const likes = await LikeModel.find({likeable : new ObjectId(likeableId) , isLiked :true}).populate({
            strictPopulate:false,
            path : 'type',
            populate:"user"
        })
        console.log("Likes =>" + likes)
        return likes
    }

    async toggleLikeRepo(likeData){
        console.log(likeData)
        const {isLiked} = likeData;
        const like = await LikeModel.findByIdAndUpdate(likeData.id , {
            isLiked
        },{
            new : true
        })
        return like
    }

    async createLike(likeData){
        const like = new LikeModel(likeData)
        await like.save()
        return like;
    }
}