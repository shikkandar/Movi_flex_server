import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique Username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  confirm_pwd: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  createdAt: { type: String },
  updatedAt: [{ type: String }],
  loginAt: [{ type: String }],
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: Number },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  zipcode: { type: String },
  profile: { type: String },
  gender:{ type: String },
  dob:{ type: String },
  bookingHistory:{type:Object},
  admin:{type:String}
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
