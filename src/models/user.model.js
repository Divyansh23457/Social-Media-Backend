import mongoose from "mongoose"

const userSchema = mongoose.Schema({

})


const UserModel = mongoose.model("User",userSchema)

export default UserModel