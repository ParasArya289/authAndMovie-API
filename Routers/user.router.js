const express = require("express");
const userRouter = express.Router();
const {signupController,loginController,changeUserPasswordController,changeUserProfileController,changeUserContactDetailsController,findUserByPhoneNumberController} = require("../Controllers/user.controller.js");
const {checkForUserExistence,checkForToken} = require("../Middlewares/midllewares.js");

userRouter.get("/phone/:phoneNumber",findUserByPhoneNumberController)

userRouter.post("/signup",checkForUserExistence,signupController);
userRouter.post("/login",loginController);

userRouter.post("/:username/update-password",checkForToken,changeUserPasswordController);
userRouter.post("/:username/update-profile",checkForToken,changeUserProfileController);
userRouter.post("/:username/update-contact",checkForToken,changeUserContactDetailsController);

module.exports=userRouter;