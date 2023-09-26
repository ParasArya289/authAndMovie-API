const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:String,
  password:String,
  fullname:String,
  username:{
    type:String,
    unique:true
  },
  avatar:String,
},{timestamps:true})

const User = mongoose.model("User",userSchema);

module.exports = User;