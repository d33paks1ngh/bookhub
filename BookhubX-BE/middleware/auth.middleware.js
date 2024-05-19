const jwt=require("jsonwebtoken");
const { blacklistModel } = require("../models/blacklistModel");


const auth=async(req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).send({ "msg": "Unauthorized - No token provided" });
      }

   try {
    const blacklistedToken = await blacklistModel.findOne({ token });
    if (blacklistedToken) {
      return res.status(403).send({ "msg": "Forbidden - Token is blacklisted" });
    }
    const decoder=jwt.verify(token,"bookhub")
    console.log(decoder);
    if(decoder)
    {
      req.body.userId=decoder.userId
      req.body.username=decoder.username
      req.body.userrole=decoder.userrole
    //   req.body.username=decoder.user
      
      next()
    }

   } catch (error) {
    res.status(403).send({ "err": error });
   }
   

}
module.exports={auth}