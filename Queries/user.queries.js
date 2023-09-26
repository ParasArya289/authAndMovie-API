require("../mongodb")
const User = require("../Models/user.model.js");

const findUserByUsername = async(username)=>{
  try{
    const user = User.findOne({username});
    return user;
  }catch(error){
    throw new Error("unable to check for existing username");
  }
}

const signup = async(userData) =>{
  try{
    const newUser = new User(userData);
    const savedUser = newUser.save();
    if(!savedUser){
      throw new Error("Unable to create account")
    }
    return savedUser;
  }catch(error){
    throw error;
  }
}

module.exports = {signup,findUserByUsername};