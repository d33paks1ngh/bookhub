const express = require("express");
const { createChat } = require("completions");
require("dotenv").config();
const axios = require("axios"); // Add this line to use axios

const chatRouter = express.Router();

const chat = createChat({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-3.5-turbo-0613",
  functions: [
    {
      name: "book_suggestions",
      description:
        "This function provides book suggestions based on author names or book titles. It offers book title , author name, and image of book for matched books and provides brief descriptions for books not found in the api or database. Please input the author's name or book genre you'd like recommendations for.**give me the response in string format",
      parameters: {
        type: "object",
        properties: {
          authorName: {
            type: "string",
            description: "author",
          },
          genreName: {
            type: "string",
            description: "genre",
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
       

          console.log(response.data);
          return response.data;
          
        } catch (error) {
          console.error("Error fetching books from API:", error);
          return [];
        }
      },
    },
  ],
  functionCall: "auto",
});

chatRouter.post("/bot", async (req, res) => {
  try {
    
    const { message } = req.body;
    if (!message) {
      return res.status(400).send({ error: "Message is required in the request body." });
    }
    const response = await chat.sendMessage( message);
   

    // let lines = response.split('\n');
    // lines.shift();
    // let modifiedString = lines.join('\n');
    
    // // Get the string starting from "1."
    // let startIndex = modifiedString.indexOf('1.');
    // let finalString = modifiedString.substring(startIndex);

    // console.log(finalString);






console.log(response);
console.log(typeof(response));

// console.log(response.content);
res.status(200).send(response.content);

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
});

module.exports = {
  chatRouter,
};
