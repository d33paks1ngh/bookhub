const express=require("express")
const { bookModel } = require("../models/bookModel")
const { auth } = require("../middleware/auth.middleware")


const bookRouter=express.Router()


bookRouter.get("/",async(req,res)=>{
    try {

        const { author, title, publisher, genre, sortBy, sortOrder } = req.query;
        const query = {}

        if (author) {
            query.author =  { $regex: author, $options: 'i' };
          }

          if (title) {
          
            query.title = { $regex: title, $options: 'i' };
          }
      
          if (publisher) {
           
            query.publisher ={ $regex: publisher, $options: 'i' };
          }
      
          if (genre) {
            
            query.genre = { $regex: genre, $options: 'i' };
          }

        let allbooks=await bookModel.find(query)
        res.status(200).send(allbooks)
    } catch (error) {
        res.status(200).send({"error":error})
    }
})

bookRouter.post("/add",auth,async(req,res)=>{
    
    const {title,genre,description,price,image,publisher,author,stock}=req.body

    try {

        if (req.body.userrole !== "author" && req.body.userrole !== "admin") {
            return res.status(403).send({ "msg": "You don't have permission to add books" });
        }

        const author=(req.body.userrole == "author" || req.body.userrole == "admin") ? req.body.username : undefined;
        const newBook = new bookModel({...req.body,author:[author]});
        await newBook.save()

        res.status(201).send({ "msg": "Book added successfully", book: newBook });

    } catch (error) {
        res.status(500).send({ "error": error });
    }

})


bookRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params

    try {
        const book=await bookModel.findOne({_id:id})

        if(!book)
        {
            return res.status(200).send({"msg":`Book with ${id} does not exist`})
        }

        
        if(req.body.userrole=="admin")
        {
            const updatedBook=await bookModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Book is updated",updatedBook})
        }
        else{

                if(req.body.userId==book.userId)
                {
                    const updatedBook=await bookModel.findByIdAndUpdate({_id:id},req.body)
                    res.status(200).send({"msg":"Book is updated",updatedBook})
                }
                else{
                    res.status(200).send({"msg":"You dont have permission to update this book"})
                }

        }

    } catch (error) {
        console.log(error);
        res.status(400).send({"err":error})
    }

})


bookRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params

    try {
        const book=await bookModel.findOne({_id:id})

        if(!book)
        {
            return res.status(200).send({"msg":`Book with ${id} does not exist`})
        }

        
        if(req.body.userrole=="admin")
        {
            await bookModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":"Book is deleted"})
        }
        else{

                if(req.body.userId==book.userId)
                {
                    await bookModel.findByIdAndDelete({_id:id})
                    res.status(200).send({"msg":"Book is Deleted"})
                }
                else{
                    res.status(200).send({"msg":"You dont have permission to delete this book"})
                }

        }

    } catch (error) {
        console.log(error);
        res.status(400).send({"err":error})
    }

})

//get Single Book details route
bookRouter.get("/book/:bookid",async(req,res)=>{
    const {bookid}=req.params

    try {
        const book=await bookModel.findOne({_id:bookid})

        if(!book)
        {
            return res.status(200).send({"msg":`Book with ${id} does not exist`})
        }

        res.status(200).send(book)
        
    } catch (error) {
        console.log(error);
        res.status(400).send({"err":error})
    }

})


//user's details/profile page get  Book  route without authentication for community
bookRouter.get("/userbook/:userId",async(req,res)=>{
    try {
//get this userid in front end from url params
       const {userId}=req.params

        let allbooks=await bookModel.find({userId})
        res.status(200).send(allbooks)
    } catch (error) {
        res.status(400).send({"error":error})
    }
})


//get user book foruser own profile with authentication
bookRouter.get("/userbook",auth,async(req,res)=>{
    try {

       const {userId}=req.body

        let allbooks=await bookModel.find({userId})
        res.status(200).send(allbooks)
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
module.exports={
    bookRouter
}