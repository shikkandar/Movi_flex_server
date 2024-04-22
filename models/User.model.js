import mongoose from "mongoose";

export const UserSchema=new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    confirm_pwd: {
        type: String,
        required: [true, "Please confirm your password"]
    },
    profile: { type: String}
    
});

export default mongoose.model("User",UserSchema)