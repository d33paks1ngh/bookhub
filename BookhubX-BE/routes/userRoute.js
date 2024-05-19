const express=require("express")
const { userModel } = require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { blacklistModel } = require("../models/blacklistModel")

const userRoute=express.Router()


userRoute.post("/register",async(req,res)=>{
    const {role,email,password,username}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            res.status(201).send({"msg":`user with email ${email} already exist`})
        }
        else{
            bcrypt.hash(password, 5,async (err, hash)=> {
                if(err)
                {
                    res.status(400).send({"err":err}) 
                }
                else{
                    const newuser=new userModel({...req.body,password:hash})
                    await  newuser.save()
                    res.status(200).send({"msg":`One New User created`})
                }
                
            });
        }
    } catch (error) {
        console.log(error);
       res.status(400).send({"err":error})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})

        if(user){
            // console.log(user);
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result)
                {
                    var token = jwt.sign({ userId:user._id,username:user.username,userrole:user.role }, 'bookhub');
                    res.status(200).send({"msg":"Logedd in Successfully",token,username:user.username,userrole:user.role})
                }
                else{
                    res.status(400).send("Invalid password") 
                }
            });
        }

        else{
            res.status(401).send({"msg":"Invalid email"})
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({"err":error})
    }
})


userRoute.post("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(400).send({ "msg": "No token provided" });
      }

      try {
        const blacklisted= await blacklistModel.findOne({token})
        if(blacklisted){
            return res.status(200).send({"msg":"token already blacklisted"})
        }
        else{
            await blacklistModel.create({ token })
            res.status(200).send({ "msg": "Logged out successfully" });
        }
      } catch (error) {
        console.error(error);
         res.status(500).send({ "msg": "Internal Server Error" });
      }
    
   
})

//get user profile details for community
userRoute.get("/userdetails/:userId",async(req,res)=>{
  
    try {
        const {userId}=req.params
        const users=await userModel.findOne({_id:userId})
        res.status(200).send(users)
    } catch (error) {
        console.log(error);
       res.status(400).send({"err":error})
    }
})

//userdetails
userRoute.get("/allusers",async(req,res)=>{
  
    try {
        const users=await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        console.log(error);
       res.status(400).send({"err":error})
    }
})



module.exports={
    userRoute
}