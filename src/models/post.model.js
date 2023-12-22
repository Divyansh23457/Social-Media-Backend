import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    
  },{ timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;