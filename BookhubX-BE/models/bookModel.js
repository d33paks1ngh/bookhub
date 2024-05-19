const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    title: {type: String, required: true},
    author: [{type:String}],
    genre: [{type:String}],
    description: String,
    price: String,
    image: String,
    publisher: String,
    userId:String,
    stock:Number
},{
    versionKey:false
})

const bookModel=mongoose.model("book",bookSchema)

module.exports={
    bookModel
}