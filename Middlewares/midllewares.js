const jwt = require("jsonwebtoken")
const {findUserByUsername} = require("../Queries/user.queries.js");
const checkForToken = (req,res,next) => {
  const {secret} = process.env;
  const token = req.headers.authorization;
  try{
    const {user} = jwt.verify(token,secret)
    req.username = {username};
    next();
  }catch(error){
    res.status(401).json({error:"Unauthorized"})
  }
}
const checkForUserExistence = async(req,res,next)=>{
  const {body} = req;
  try{
     const user = await findUserByUsername(body.username);
    console.log(user)
    if(user){
      throw new Error("Username already exist")
    }
    next();
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

module.exports = {checkForToken,checkForUserExistence};