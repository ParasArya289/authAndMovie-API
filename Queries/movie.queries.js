const Movie = require("../Models/movie.model.js")
const User = require("../Models/user.model.js")

const addRatingAndReview = async(movieId,review)=>{
  try{
    const movie = await Movie.findByIdAndUpdate(movieId,{$push:{reviews:review}},{new:true}).populate({path: 'reviews.user',
  select: 'username email avatar fullname',})
    if(!movie){
      throw new Error("Unable to add review")
    }
    return movie
  }catch(error){
    throw new Error("Movie not found, unable to add review");
  }
}
const getMovieReviewsWithUserDetails = async(movieId)=>{
  try{
    const {reviews} = await Movie.findById(movieId).populate({path: 'reviews.user',
  select: 'username email avatar fullname',})
    if(!reviews.length){
      throw new Error("Movie not found")
    }
    return reviews
  }catch(error){
    throw new Error("Movie not found, unable to find reviews");
  }
}

module.exports = {addRatingAndReview,getMovieReviewsWithUserDetails}