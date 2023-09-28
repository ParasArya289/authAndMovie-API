const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title:String,
  year:Number,
  reviews:[
    {
      text:String,
      rating:Number,
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    }
  ]
},{timeStamp:true})

const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;