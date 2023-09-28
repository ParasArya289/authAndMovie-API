const express = require("express");
const userRouter = express.Router();
const {signupController,loginController,changeUserPasswordController,changeUserProfileController,changeUserContactDetailsController} = require("../Controllers/user.controller.js");
const {checkForUserExistence,checkForToken} = require("../Middlewares/midllewares.js");

userRouter.post("/signup",checkForUserExistence,signupController);
userRouter.post("/login",loginController);

userRouter.post("/:username/update-password",checkForToken,changeUserPasswordController);
userRouter.post("/:username/update-profile",checkForToken,changeUserProfileController);
userRouter.post("/:username/update-contact",checkForToken,changeUserContactDetailsController);

module.exports=userRouter;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhcmFzYXJ5YTI4OSIsImlhdCI6MTY5NTg4OTUyNX0.W-NpIP4gxx8vSMSLEgb7S14qufShT8g0yNXzBOT5Obw