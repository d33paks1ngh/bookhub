const mongoose=require("mongoose")

const reviewSchema=mongoose.Schema({
    userId:String,
    username:String,
    bookId:String,
    rating :Number,
   reviewText:String,
    
    
},{
    versionKey:false
})

const reviewModel=mongoose.model("review",reviewSchema)
module.exports={
    reviewModel
}