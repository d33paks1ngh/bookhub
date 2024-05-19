const express=require("express")
const { auth } = require("../middleware/auth.middleware");
const { reviewModel } = require("../models/reviewModel");


const reviewRoute=express.Router()

reviewRoute.post("/add", auth, async (req, res) => {


    try {
      const { bookId, rating, reviewText } = req.body;
  //get bookid in frontend from url param
      
      const newReview = new reviewModel(req.body);
  
      
      await newReview.save();
  
      res.status(201).send({ "msg": "Review added successfully", review: newReview });
    } catch (error) {
        console.log(error);
      res.status(500).send({ "error": error });
    }
  });


  //get all review of a book
  reviewRoute.get("/book/:bookId", async (req, res) => {
    try {
      const { bookId } = req.params;
  
      
      const reviews = await reviewModel.find({ bookId });
  
      res.status(200).send(reviews);
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });

module.exports={
    reviewRoute
}