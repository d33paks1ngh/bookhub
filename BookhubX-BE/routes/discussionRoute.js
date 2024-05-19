const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { discussionModel } = require("../models/discussionModel")
const { commentModel } = require("../models/commentModel")

const discussionRoute=express.Router()

//create discussion
discussionRoute.post("/create",auth,async(req,res)=>{
    const {title,content,genre,author}=req.body

    try {
        const newDiscussion=new discussionModel({...req.body,genre:genre||[],author:author||""})
        await newDiscussion.save()
        res.status(200).send({"msg":"One new discussion is created"})
    } catch (error) {
        res.status(400).send({"err":error})
    }

})

//all discussion
discussionRoute.get("/alldiscussions",async(req,res)=>{
  
try {
      const discussions=await discussionModel.find()
      
      res.status(200).send(discussions)
  } catch (error) {
      res.status(400).send({"err":error})
  }

})

//get user all discussion
discussionRoute.get("/mydiscussion",auth,async(req,res)=>{
  
  try {
    const userId=req.body.userId
        const discussions=await discussionModel.find({userId:userId})
        
        res.status(200).send(discussions)
    } catch (error) {
        res.status(400).send({"err":error})
    }
  
  })

  //get user all discussion for community page without authentication
discussionRoute.get("/userdiscussion/:userId",async(req,res)=>{
  
  try {
    const {userId}=req.params
        const discussions=await discussionModel.find({userId:userId})
        
        res.status(200).send(discussions)
    } catch (error) {
        res.status(400).send({"err":error})
    }
  
  })


//single discussion
discussionRoute.get("/:discussionId",async(req,res)=>{
  const {discussionId}=req.params
  try {
        const discussions=await discussionModel.findOne({_id:discussionId})
        
        res.status(200).send(discussions)
    } catch (error) {
      console.log(error);
        res.status(400).send({"err":error})
    }
  
  })
  

  //update discussion
discussionRoute.patch("/update/:id",auth,async(req,res)=>{
  const {id}=req.params

  try {
    const discussion=await discussionModel.findOne({_id:id})
    if(!discussion){
      return res.status(404).send({"msg":`No discussion found with the id ${id}`})
    }

    if(discussion.userId==req.body.userId)
    {
      const updatedDiscussion=await discussionModel.findByIdAndUpdate({_id:id},req.body)
      res.status(200).send({"msg":"Discussion is updated"})
    }
    else{
      res.status(200).send({"msg":"You dont have permission to update"})
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({"err":error})
  }
})


//delete
discussionRoute.delete("/delete/:id",auth,async(req,res)=>{
  const {id}=req.params

  try {
    const discussion=await discussionModel.findOne({_id:id})
    if(!discussion){
      return res.status(404).send({"msg":`No discussion found with the id ${id}`})
    }

    if(discussion.userId==req.body.userId)
    {
      const deletedDiscussion=await discussionModel.findByIdAndDelete({_id:id})
      res.status(200).send({"msg":"Discussion is deleted"})
    }
    else{
      res.status(400).send({"msg":"You dont have permission to update"})
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({"err":error})
  }
})


//add comment to a discussion
discussionRoute.post("/comment/:discussionid", auth, async (req, res) => {

    try {
      const { discussionid } = req.params;
      const { commentText } = req.body;
  
      
      const discussion = await discussionModel.findOne({_id:discussionid});
      if (!discussion) {
        return res.status(404).send({ "msg": "Discussion not found" });
      }
  
     const newComment = new commentModel({...req.body,discussionId:discussionid});
     await newComment.save();
  
      res.status(200).send({ "msg": "One new Comment added successfully", comment: newComment });
    } catch (error) {
        console.log(error);
      res.status(500).send({ "error": error });
    }
  });


  //get all comments of a discusson
  discussionRoute.get("/comment/:discussionid", auth, async (req, res) => {

    try {
      const { discussionid } = req.params;
     
  
      
      const discussion = await discussionModel.findOne({_id:discussionid});
      if (!discussion) {
        return res.status(404).send({ "msg": "Discussion not found" });
      }
  
     const allcomments = await commentModel.find({discussionId:discussionid})
     
  
      res.status(200).send( allcomments );
    } catch (error) {
        console.log(error);
      res.status(500).send({ "error": error });
    }
  });


module.exports={
    discussionRoute
}