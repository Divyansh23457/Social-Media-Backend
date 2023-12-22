import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    
  },{ timestamps: true }
);

const LikeModel = mongoose.model("Like", likeSchema);

export default LikeModel;