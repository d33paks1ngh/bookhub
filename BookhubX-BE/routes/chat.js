const express = require("express");
const axios = require("axios");
const { createChat } = require("completions");
require("dotenv").config();

const chatbotRouter = express.Router();

chatbotRouter.post("/", async (req, res) => {
 

    try {
        const { message } = req.body;
        const response = await chat.sendMessage(message);

        const lines = response.content.split('\n').slice(2);

 // Split by numbers (1., 2., etc.) and create an array of objects
 const books = lines.join('\n').split(/\d+\.\s+/).filter(Boolean).map(bookInfo => {
    const lines = bookInfo.split('\n').filter(Boolean);
    const book = {};

    lines.forEach(line => {
        const [key, value] = line.split(': ');
        if (key && value) {
            book[key.toLowerCase().trim()] = value.trim();
        }
    });

    return book;
});

console.log(books);
    res.status(200).send(books)
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }


});



const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY, // Correct the process variable name
    model: "gpt-3.5-turbo-0613",
    functions: [
      {
        name: "book_suggestion",
        description:
          " This function provides book suggestions based on author names or genre. It offers book title , author name,  for matched books and provides brief descriptions for books not found in the api or database. Please input the author's name or book genre you'd like recommendations for.",
        parameters: {
          type: "object",
          properties: {
            authorName: {
              type: "string",
              description: "authorName",
            },
            genreName: {
              type: "string",
              description: "genreName",
            },
          },
         
        },
        function: async ({ authorName, genreName }) => {
         
          try {
            const queryParameters = {};
          if (authorName) {
            queryParameters.author = authorName;
          }
          if (genreName) {
            queryParameters.genre = genreName;
          }

          const response = await axios.get("http://localhost:8080/books", {
            params: queryParameters,
          });
          console.log(response);
            return response.data;

          } catch (err) {
            console.log(err);
            return err;
          }
        },
      },
    ],
    functionCall: "auto",
  });



module.exports = {
  chatbotRouter,
};




