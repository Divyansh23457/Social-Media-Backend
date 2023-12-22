import PostModel from "../models/post.model.js";
import {ObjectId} from "mongodb"
import UserModel from "../models/user.model.js";

export default class PostRepository{
    async createPostRepo(postData){
        const newPost = new PostModel(postData)
        await newPost.save()

        const user = await UserModel.findByIdAndUpdate(postData.user,{
            $push:{
                posts:newPost
            }
        })
        await user.save()
        return newPost; 
    }

    async updatePostRepo(newPostData){
        // console.log("newPOstData => " + newPostData)
        const {id , caption , imageUrl , imageCloudinaryPublicId} = newPostData
        const updatedPost = await PostModel.findByIdAndUpdate(id,{
            $set:{
                caption,
                imageUrl,
                imageCloudinaryPublicId
            }
        },{
            new : true
        })
        return updatedPost;
    }

    async getAllPostsRepo(){
        const allPosts = await PostModel.find()
        return allPosts
    }

    async getPostByIdRepo(postId){
        const post = await PostModel.findById(postId)
        return post;
    }

    async getPostsByUserRepo(userId){
        
        const posts = await PostModel.find({
            user : new ObjectId(userId)
        })
        return posts;
    }
}