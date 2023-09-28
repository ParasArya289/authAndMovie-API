const {addRatingAndReview,getMovieReviewsWithUserDetails} = require("../Queries/movie.queries.js");

const addRatingAndReviewController = async(req,res)=>{
  const {movieId} = req.params;
  const {body} = req;
  try{
    const updatedMovie = await addRatingAndReview(movieId,body);
    res.status(201).json({message:"Review Added",movie:updatedMovie})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const getMovieReviewsWithUserDetailsController = async(req,res)=>{
  const {movieId} = req.params;
  try{
    const reviews = await getMovieReviewsWithUserDetails(movieId);
    res.status(201).json({message:"Reviews found",reviews})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

module.exports = {addRatingAndReviewController,getMovieReviewsWithUserDetailsController};