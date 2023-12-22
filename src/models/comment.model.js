import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    
  },{ timestamps: true }
);

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;