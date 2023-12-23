import PostRepository from "../Repositories/post.Repository.js"
import {UserModel,CommentModel} from "../models/index.model.js";
import { cloudinaryRemoveFile, cloudinaryUploadFile } from "../Utils/cloudinary.utility.js";
import PostModel from "../models/post.model.js";


export default class PostController{

    constructor(){
        this.postRepository = new  PostRepository()
    }

    async createPost(req,res){
        const userId = req.userId;
        const caption = req.body.caption;
        const user = await UserModel.findById(userId).select('-password')
        if(!user){
            return res.status(400).send("User not found")
        }
        try{

            let cloudinaryResponse
            if(req.file){
                cloudinaryResponse = await cloudinaryUploadFile(req.file.path)
            }
            const createdPost = await this.postRepository.createPostRepo({
                user : userId,
                caption,
                imageUrl : cloudinaryResponse?.secure_url,
                imageCloudinaryPublicId:cloudinaryResponse?.public_id
                
            })
            return res.status(201).json({
                success:true,
                post: createdPost
            })
        }catch(err){
            console.log(err)
            console.log("Error while uploading Post")
            return res.status(400).send("Internal Server Error")
        }

    }

    async updatePost(req,res){
        const userId = req.userId
        const postId = req.params.postId
        const {caption} = req.body;
        try{
            const post = await PostModel.findById(postId)
            // console.log("POST => " + post)
            if(!post) {
                return res.status(400).json({
                    success:false,
                    message:"Post not found"
                })
            }
            if(post.user != userId){
                return res.status(400).json({
                    success:false,
                    message:"Only the users who have created the post can update the respective posts"
                })
            }
            
            
            let cloudinaryResponse = await cloudinaryRemoveFile(post.imageCloudinaryPublicId) 
            cloudinaryResponse = await cloudinaryUploadFile(req.file.path) 

            const result = await this.postRepository.updatePostRepo({
                id : postId,
                caption , 
                imageUrl : cloudinaryResponse?.secure_url,
                imageCloudinaryPublicId : cloudinaryResponse?.public_id
            })

            if(!result){
                return res.status(400).json({
                    success:false,
                    message:"Error while updating post"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    updatedPost : result
                })
            }

            
        }catch(err){
            console.log(err)
            console.log("Error while updating post")
        }
    }

    async getAllPosts(req,res){
        try{
            const result = await this.postRepository.getAllPostsRepo()
            if(result){
                return res.status(200).json({
                    success:true,
                    Posts : result
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while getting all the posts")
            return res.status(400).json({
                success:false,
                message:"Could not retrieve all the posts"
            })
        }
    }

    async getPostById(req,res){

        const {postId} = req.params;
        try{
            const post = await this.postRepository.getPostByIdRepo(postId)
            if(!post){
                return res.status(400).json({
                    success:false,
                    message:"Could not retrieve the specified post"
                })
            }
            else{
                return res.status(200).json({
                    success:true,
                    post
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while fetching the post by Id")
            return res.status(400).json({
                success:false,
                message:"Could not retrieve the specified post"
            })
        }
    }

    async getPostByUser(req,res){
        const userId = req.userId;
        try{
            const posts = await this.postRepository.getPostsByUserRepo(userId)
            if(!posts){
                return res.status(400).json({
                    success:false,
                    message:"Could not retrive the posts created by the logged-in user"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    posts
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while fetching the related posts")
        }
    }
    async deletePostById(req,res){
        const userId = req.userId;
        const postId = req.params.postId
        try{
            const post = await PostModel.findById(postId).select('imageCloudinaryPublicId user comments')
            console.log(post)
            if(!post){
                return res.status(400).json({
                    success:false,
                    message:"Post could not be found"
                })
            }
            const postImagePublicId = post.imageCloudinaryPublicId;
            if(post.user != userId){
                return res.status(400).json({
                    success:false,
                    message:"Only the owner of the post can remove the post"
                })
            }
            const deleteResults= await PostModel.findByIdAndDelete(postId)
            if(!deleteResults){
                return res.status(400).json({
                    success:false,
                    message:"Error while deleting the post"
                })
            }
            else{
                await cloudinaryRemoveFile(postImagePublicId);
                console.log(post)
                post.comments.map(async(commentId) => await CommentModel.findByIdAndDelete(commentId))
                return res.status(200).json({
                    success:true,
                    message:"Post deleted successfully"
                })
            }

        }catch(err){
            console.log(err)
            console.log("Could not delete specified post")
        }
    }
}