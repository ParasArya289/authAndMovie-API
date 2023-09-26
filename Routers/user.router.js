const express = require("express");
const userRouter = express.Router();
const {signupController} = require("../Controllers/user.controller.js");
const {checkForUserExistence} = require("../Middlewares/midllewares.js");

userRouter.post("/signup",checkForUserExistence,signupController);

module.exports=userRouter;