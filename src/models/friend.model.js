import mongoose from "mongoose";

const friendSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendModel = mongoose.model("Friend", friendSchema);

export default FriendModel;
