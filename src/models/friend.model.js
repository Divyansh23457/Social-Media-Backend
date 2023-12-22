import mongoose from "mongoose";

const friendSchema = mongoose.Schema(
  {
    
  },{ timestamps: true }
);

const FriendModel = mongoose.model("Friend", friendSchema);

export default FriendModel;