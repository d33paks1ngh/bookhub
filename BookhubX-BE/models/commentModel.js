const mongoose=require("mongoose")

const commentSchema=mongoose.Schema({
    userId:String,
    username:String,
    discussionId :String,
    commentText:String
},{
    versionKey:false
})

const commentModel=mongoose.model("comment",commentSchema)
module.exports={
    commentModel
}