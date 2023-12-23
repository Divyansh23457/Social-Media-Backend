import CommentRepository from "../Repositories/comment.Repository.js";
import {PostModel , CommentModel } from '../models/index.model.js'

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository()
    }

    async getComments(req,res){
        const postId = req.params.postId;
        try{
            const results = await this.commentRepository.getCommentsRepo(postId)
            if(!results){
                return res.status(400).json({
                    success:false,
                    message:"Error while getting the post comments "
                })
            }else{
                return res.status(200).json({
                    success:true,
                    Comments:results
                })
            }

        }catch(err){
            console.log(err)
            console.log("Error while fetching comments for the specified post")
            return res.status(400).json({
                success:false,
                message:"Server error occured"
            })
        }
    }

    async addComment(req,res){

        const text = req.body.content;
        const userId = req.userId;
        const postId = req.params.postId;
        const commentBody = {text , userId , postId}
        try{
            const result = await this.commentRepository.addCommentRepo(commentBody)
            if(!result){
                return res.status(400).json({
                    success:false,
                    message:"Could not add comment to the post"
                })
            }else{
                return res.status(201).json({
                    success:true,
                    Comment:result
                })
            }

        }catch(err){
            console.log(err)
            console.log("Error while adding the comment to the post")
            return res.status(400).json({
                success:false,
                message:"Server error occured"
            })
        }

    }
    
    async deleteComment(req,res){

        const userId = req.userId;
        const commentId = req.params.commentId;

        try{
            
            const comment = await CommentModel.findById(commentId);
            if(!comment){
                return res.status(404).json({
                    success:false,
                    message:"Comment not found"
                })
            }
            const post =  await PostModel.findById(comment.postId)
            if(!post){
                return res.status(404).json({
                    success:false,
                    message:"Post could not be found"
                })
            }
            if(userId != comment.userId && userId != post.user){
                return res.status(400).json({
                    success:false,
                    message:"You are not authorized to remove the specified comment.Only the post owner or comment owner can delete the comment"
                })
            }

            const results = await CommentModel.findByIdAndDelete(commentId)
            if(!results){
                res.status(400).json({
                    success:false,
                    message:"Could not delete comment"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    message:"Comment deleted successfully"
                })
            }
        }catch(err){
            console.log(err)
            console.log("Error while fetching comments for the specified post")
            return res.status(400).json({
                success:false,
                message:"Server error occured"
            })
        }

    }

    async updateComment(req,res){

        const text = req.body.content;
        const userId = req.userId;
        const commentId= req.params.commentId
        try{
            const comment = await CommentModel.findById(commentId)
            if(!comment){
                return res.status(404).json({
                    success:false,
                    message:"Comment not found"
                })
            }
            if(comment.userId != userId){
                return res.status(400).json({
                    success:false,
                    message:"Only the owner of the comment can edit the comment"
                })
            }
            
            const commentBody = {text , id : commentId}
            const updatedComment = await this.commentRepository.updateCommentRepo(commentBody)
            if(!updatedComment){
                return res.status(400).json({
                    success:false,
                    message:"Could not update the specified comment"
                })
            }else{
                return res.status(200).json({
                    success:true,
                    updatedComment
                })
            }

        }catch(err){
            console.log(err)
            console.log("Error while fetching comments for the specified post")
            return res.status(400).json({
                success:false,
                message:"Server error occured"
            })
        }

    }

}