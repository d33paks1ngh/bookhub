const express=require("express");
const { cartModel } = require("../models/cartModel");
const { auth } = require("../middleware/auth.middleware");
const { bookModel } = require("../models/bookModel");


const cartRoute=express.Router()


//  get user's cart details
cartRoute.get("/user", auth, async (req, res) => {
    try {
      const  userId  = req.body.userId;
  
      // Find all cart items for the specified user
      const userCart = await cartModel.find({ userId });
  
      res.status(200).send(userCart);
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });
  

  //add book in cart
cartRoute.post("/add", auth, async (req, res) => {
    try {
      const { bookId, quantity } = req.body;
  
      
      const existingCartItem = await cartModel.findOne({ userId: req.body.userId, bookId });
      const book=await bookModel.findOne({_id:bookId})

      if (existingCartItem) {
       
        return res.status(200).send({ "msg": "Book is already in the cart", cartItem: existingCartItem });
      }
  
     
      const newCartItem = new cartModel({...req.body,bookimage:book.image,bookprice:book.price,booktitle:book.title});
  
   
      await newCartItem.save();
      res.status(201).send({ "msg": "Book added to cart successfully", cartItem: newCartItem });
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });


//update the quantity a partcular book in cart
  cartRoute.patch("/update/:cartItemId", auth, async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;
  
      
      const cartItem = await cartModel.findById(cartItemId);
  
      if (!cartItem) {
        return res.status(404).send({ "msg": "Cart item not found" });
      }
  
      if(cartItem.userId==req.body.userId)
      {
        cartItem.quantity = quantity;
        await cartItem.save();
  
      res.status(200).send({ "msg": "Cart item quantity updated successfully", cartItem });
      }
      else{
        res.status(400).send({ "msg": "You are not authorised" });
      }
     
     
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });




// Remove a book from the user's cart
cartRoute.delete("/remove/:cartItemId", auth, async (req, res) => {
    try {
      const { cartItemId } = req.params;
  
     
      const isCartItem = await cartModel.findById(cartItemId);
  
      if (!isCartItem) {
        return res.status(404).send({ "msg": "Cart item not found" });
      }
  
      if(isCartItem.userId==req.body.userId)
      {
         await cartModel.findByIdAndDelete({_id:cartItemId});
  
      res.status(200).send({ "msg": "Cart item quantity deleted successfully" });
      }
      else{
        res.status(400).send({ "msg": "You are not authorised" });
      }

  
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });


module.exports={
    cartRoute
}