import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    userId : {
      required:true,
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    isLiked:{
      type:Boolean,
      default:true,
      required:true
    },
    likeable:{
      type:mongoose.Schema.Types.ObjectId,
      refPath:'type',
      required:true
    },
    type:{
      type:String,
      enum:['Comment', 'Post']
    }
  },{ timestamps: true }
);

const LikeModel = mongoose.model("Like", likeSchema);

export default LikeModel;