import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text:{
      type:String,
      required:true,
      trim:true
    },
    userId:{
      required:true,
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    postId:{
      required:true,
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }
  },{ timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;