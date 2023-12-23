import {CommentModel , PostModel} from "../models/index.model.js";


export default class CommentRepository{

    async getCommentsRepo(postId){
        const comments = await CommentModel.find({postId})
        return comments;
    }

    async addCommentRepo(commentBody){
        // console.log(commentBody)
        const comment = new CommentModel(commentBody)
        await comment.save()
        const post = await PostModel.findByIdAndUpdate(commentBody.postId,
            {
                $push:{
                    comments:comment
                }
            })
        await post.save()
        return comment;
    }

    async updateCommentRepo(commentBody){
        const updatedComment = CommentModel.findByIdAndUpdate(commentBody.id ,{
            $set:{
                text:commentBody.text
            }
        },{
            new : true
        })
        return updatedComment
    }

}