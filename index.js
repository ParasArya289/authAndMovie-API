const express = require("express");
const userRouter = require("./Routers/user.router.js");
const movieRouter = require("./Routers/movie.router.js");
// require("./mongodb")

const app = express();
app.use(express.json())

app.use("/user",userRouter);
app.use("/movies",movieRouter);

app.get("/",(req,res)=>res.send("User authentication and Movie API"))


//Global error handler
app.use((err,req,res,next)=>{
  res.status(500).json({error:"Something went wrong!!"})
})

//Global route handler
app.use((req,res)=>{
  res.status(404).json({error:"Requested API endpoint does not exist!"})
})

app.listen(3000,()=>{
  console.log("server started")
})