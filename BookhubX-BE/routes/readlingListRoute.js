const express=require("express")

const { orderModel } = require("../models/orderModel");
const { readinglistModel } = require("../models/readingList");
const { bookModel } = require("../models/bookModel");
const { auth } = require("../middleware/auth.middleware");



const readingListRoute=express.Router()


readingListRoute.post("/", auth, async (req, res) => {
    try {
      const userId = req.body.userId;
      const { bookId } = req.body;
  
      // Check if the user has bought the book (exists in order history)
      const hasBoughtBook = await hasUserBoughtBook(userId, bookId);
  


      if (!hasBoughtBook) {
        return res.status(403).json({ error: "User has not bought this book" });
      }

    
      const book=await bookModel.findOne({_id:bookId})
      
  
      // Create a new reading list entry
      const newReadingListEntry = new readinglistModel({
        userId,
        bookId,
        image:book.image,
        title:book.title,
        
      });
  
      await newReadingListEntry.save();
  
      res.status(201).json({ msg: "Book added to reading list successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  async function hasUserBoughtBook(userId, bookId) {
    const userOrders = await orderModel.find({ userId });
  
    for (const order of userOrders) {
      const boughtBooks = order.books.map((item) => item.bookId.toString());
  
      if (boughtBooks.includes(bookId.toString())) {
        return true;
      }
    }
  
    return false;
  }


  //get reading list of any user without authorization for user side
  readingListRoute.get("/all/:userid", async (req, res) => {
    try {
      const {userid} = req.params
  
      // Fetch the user's reading list
      const anyUserReadingList = await readinglistModel.find( {userId:userid} );
  
      res.status(200).json(anyUserReadingList);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });




 
//get reading list of any user with authorization for user's personal side

  readingListRoute.get("/user", auth, async (req, res) => {
    try {
        // Fetch the user's reading list
        const userId = req.body.userId; // This is where the issue might be

        const userReadingList = await readinglistModel.find({ userId });

        res.status(200).json(userReadingList);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

  readingListRoute.delete("/remove/:bookId", auth, async (req, res) => {
    try {
      const userId = req.body.userId;
      const bookId = req.params.bookId;
  
      // Check if the book is in the user's reading list
      const entryToRemove = await readinglistModel.findOneAndDelete({ userId, bookId });
  
      if (!entryToRemove) {
        return res.status(404).json({ error: "Book not found in reading list" });
      }
  
      res.status(200).json({ msg: "Book removed from reading list successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });



module.exports={
    readingListRoute
}