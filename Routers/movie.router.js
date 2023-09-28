const express = require("express");
const movieRouter = express.Router();
const {addRatingAndReviewController,getMovieReviewsWithUserDetailsController} = require("../Controllers/movie.controller.js");

movieRouter.get("/:movieId/reviews",getMovieReviewsWithUserDetailsController);
movieRouter.post("/:movieId/rating",addRatingAndReviewController);
module.exports = movieRouter;