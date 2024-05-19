const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  username:String,
  books: [
    {
      bookId: {type: String},
      quantity: {type: Number},
      bookTitle: String,
      Bookimage: String,
      price:String
    }
  ],
  totalPrice: {
    type: Number,
    
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered'],
    default: 'Processing',
  },
  address:{
    street:String,
    state:String,
    zip:String
  }
},{
  versionKey:false
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = {orderModel};
