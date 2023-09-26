const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {signup,findUserByUsername} = require("../Queries/user.queries.js");

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
    
    const savedUser = await signup({...body,password:hashedPassword});
    res.status(201).json({message:"Account created",user:savedUser,token:generatedToken});
  }catch(error){
    res.status(500).json({error:"Failed to create User account"})
  }
}

module.exports = {signupController};