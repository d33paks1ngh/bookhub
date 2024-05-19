const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { orderModel } = require("../models/orderModel")
const { cartModel } = require("../models/cartModel")
const { bookModel } = require("../models/bookModel")


const orderRoute=express.Router()


orderRoute.post("/",auth,async(req,res)=>{

    try {
    
    const {address}=req.body
const userId=req.body.userId
      const userCart = await cartModel.find({ userId });
    
      if (!userCart || userCart.length == 0) {
        return res.status(400).json({ error: 'User cart is empty' });
      }
        const totalPrice = await calculateTotalPrice(userCart);
        const indianDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const newOrder=new orderModel({...req.body,
            orderDate:indianDate,
            status: 'Processing',
            books: userCart.map(cartItem => ({
                bookId: cartItem.bookId,
                quantity: cartItem.quantity,
                bookTitle: cartItem.booktitle,
                 Bookimage: cartItem.bookimage,
                 price:cartItem.bookprice
              })),
              address,
              totalPrice
        })
        await newOrder.save()

        await removeBooksFromCart(userId, userCart);

        await updateBookStock(userCart)

        res.status(200).send({"msg":"One new Order save"})

        } catch (error) {
            console.error(error);
             res.status(500).json({ "error": error});
        }
    
})


async function calculateTotalPrice(userCart) {
    let totalPrice = 0;
    for (const cartItem of userCart) {
      
     totalPrice += Number(cartItem.bookprice) * Number(cartItem.quantity);
     
    }
    return totalPrice;
  }
  

  async function removeBooksFromCart(userId, userCart) {
    for (const { bookId } of userCart) {
      // Find and remove the book from the user's cart
      await cartModel.findOneAndDelete({ userId, bookId });
    }
  }

  async function updateBookStock(userCart) {
    for (const { bookId, quantity } of userCart) {
      // Retrieve and update book stock from the database (assuming you have a stock field in the Book model)
      const book = await bookModel.findById(bookId);
      if (book) {
        book.stock -= quantity;
        await book.save();
      }
    }
  }
  
// Get User all Orders for partcular user with authentication
orderRoute.get("/user", auth, async (req, res) => {
  try {
    const userId = req.body.userId;
    const userOrders = await orderModel.find({ userId });
    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all order for admin
orderRoute.get("/all", async (req, res) => {
  try {
   
    const Allorder = await orderModel.find();
    res.status(200).send(Allorder);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Get User's Single Order Details

orderRoute.get("/:orderId", auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderDetails = await orderModel.findById(orderId);
    if (!orderDetails) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports={
    orderRoute
}