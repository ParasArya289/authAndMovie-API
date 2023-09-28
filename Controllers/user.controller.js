const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {createAccount,findUserByUsername,changeUserPassword,changeUserProfile,changeUserContactDetails} = require("../Queries/user.queries.js");

const signupController = async(req,res)=>{
  const {body} = req;
  try{ 
  const {secret} = process.env;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password,salt);
    if(!hashedPassword){
      throw new Error("Unable to hash password");
    }
    
  const generatedToken = jwt.sign({username:body.username},secret); 
  if(!generatedToken){
      throw new Error("Unable to generate token");
    }
    
    const savedUser = await createAccount({...body,password:hashedPassword});
    res.status(201).json({message:"Account created",user:savedUser,token:generatedToken});
  }catch(error){
    res.status(500).json({error:"Failed to create User account"})
  }
}

const loginController = async(req,res)=>{
  const {username,password}=req.body;
  const {secret} = process.env;
  try{
    if(!username || !password){
      throw new Error("username and password fields are required")
    }
    const user = await findUserByUsername(username);
    if(!user){
      throw new Error("Incorrect username");
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
      throw new Error("Incorrect password");
    }
    res.status(200).json({message:"successfully loggedin",user,token:jwt.sign({username},secret)})
  }catch(error){
    res.status(401).json({error:error.message})
  }
}

const changeUserPasswordController = async(req,res)=>{
  const username = req.username;
  const {currentPassword,changedPassword} = req.body;
  try{
    if(currentPassword === changedPassword){
      throw new Error("current password is same as changed password")
    }
     const user = await findUserByUsername(username);
    if(!user){
      throw new Error("Incorrect username");
    }
    const matchedCurrentPassword = await bcrypt.compare(currentPassword,user.password);
    if(!matchedCurrentPassword){
      throw new Error("Incorrect current password");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedChangedPassword = await bcrypt.hash(changedPassword,salt)
    if(!hashedChangedPassword){
      throw new Error("unable to hash password");
    }
    
    const matchedChangedPassword = await bcrypt.compare(hashedChangedPassword,user.password)
    if(matchedChangedPassword){
      throw new Error("New password cannot be same as previous password");
    }
    const updatedUser = await changeUserPassword(username,hashedChangedPassword);
    res.status(200).json({message:"Password changed",user:updatedUser})
    
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const changeUserProfileController = async(req,res)=>{
  const {username,body} = req;
  try{
    const updatedUser = await changeUserProfile(username,body.avatar);
    res.status(200).json({message:"Avatar updated",user:updatedUser})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const changeUserContactDetailsController = async(req,res)=>{
  const {username,body} = req;
  try{
    const updatedUser = await changeUserContactDetails(username,body);
    res.status(200).json({message:"Contact details updated",user:updatedUser})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}
module.exports = {signupController,loginController,changeUserPasswordController,changeUserProfileController,changeUserContactDetailsController};