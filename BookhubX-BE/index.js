const express=require("express")
const { connection } = require("./db")
const { bookRouter } = require("./routes/bookRoute")
const { userRoute } = require("./routes/userRoute")
const { discussionRoute } = require("./routes/discussionRoute")
const { reviewRoute } = require("./routes/reviewRoute")
const { cartRoute } = require("./routes/cartRoute")
const { orderRoute } = require("./routes/orderRoute")
const { readingListRoute } = require("./routes/readlingListRoute")
const cors =require("cors")
const { chatRouter } = require("./routes/chatbotRoute")
const { chatbotRouter } = require("./routes/chat")

// const fetch = require("node-fetch")
// const fetch = require("cross-fetch");


require("dotenv").config()



const app=express()
app.use(cors())
app.use(express.json())


app.use("/books",bookRouter)
app.use("/user",userRoute)
app.use("/discussion",discussionRoute)
app.use("/review",reviewRoute)
app.use("/cart",cartRoute)
app.use("/order",orderRoute)
app.use("/readinglist",readingListRoute)
app.use("/chat",chatRouter)

app.use("/chatbot",chatbotRouter)


 





app.listen(process.env.PORT,async()=>{

    try {
        await connection
        console.log("db is connected");
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
    
})