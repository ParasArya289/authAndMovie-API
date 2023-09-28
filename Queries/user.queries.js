require("../mongodb")
const bcrypt = require("bcrypt")
const User = require("../Models/user.model.js");

const findUserByUsername = async(username)=>{
  try{
    const user = User.findOne({username});
    return user;
  }catch(error){
    throw new Error("unable to check for existing username");
  }
}

const createAccount = async(userData) =>{
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

const changeUserPassword = async(username,changedPassword)=>{
  try{
    const updatedUser = await User.findOneAndUpdate({username},{password:changedPassword},{new:true});
    if(!updatedUser){
      throw new Error("Incorrect username, unable to update password");
    }
    return updatedUser
  }
  catch(error){
    throw error;
  }
}

const changeUserProfile = async(username,updatedProfileLink)=>{
  try{
    const updatedUser = await User.findOneAndUpdate({username},{avatar:updatedProfileLink},{new:true})
    if(!updatedUser){
      throw new Error("Incorrect username, unable to update avatar")
    }
    return updatedUser;
  }catch(error){
    throw error;
  }
}

const changeUserContactDetails= async(username,updatedContact)=>{
  try{
    const updatedUser = await User.findOneAndUpdate({username},updatedContact,{new:true})
    if(!updatedUser){
      throw new Error("Incorrect username, unable to update contact details")
    }
    return updatedUser;
  }catch(error){
    throw error;
  }
}
const findUserByPhoneNumber = async(phoneNumber)=>{
  try{
    const user = await User.findOne({phoneNumber});
    if(!user){
      throw new Error("No user found for "+phoneNumber);
    }
    return user;
  }catch(error){
    throw error;
  }
}
module.exports = {createAccount,findUserByUsername,changeUserPassword,changeUserProfile,changeUserContactDetails,findUserByPhoneNumber};