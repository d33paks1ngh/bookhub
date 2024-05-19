const mongoose=require("mongoose")

const discussionSchema=mongoose.Schema({
    userId:String,
    username:String,
    title:{type:String,required:true},
    content:{type:String,required:true},
    genre:[String],
    author:String
},{
    versionKey:false
})

const discussionModel=mongoose.model("discussion",discussionSchema)
module.exports={
    discussionModel
}