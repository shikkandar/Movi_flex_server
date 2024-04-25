// models/Admin.model.js
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a unique Username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
});

const AdminModel = mongoose.model("Admin", AdminSchema, "admin");

export default AdminModel;


