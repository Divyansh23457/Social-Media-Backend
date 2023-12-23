import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    caption:{
      type:String,
      required:true
    },
    imageUrl:{
      type:String,
      required:true
    },
    imageCloudinaryPublicId:{
      type:String,
      required:true
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    comments:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
      }
    ]
  },{ timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;