import express, { response } from "express";
import {PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();
app.use = express.json();

app.get('/', (req,res) => {
    res.send('Hello World!');

})

app.post("/books", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: "Please fill all fields",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await bookModel.create(newBook);
    return res.status(201).send(book);

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});



mongoose
.connect(mongoDBURL)
.then(() =>{
    console.log('Connected to MongoDB');
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});
})

.catch((err) => {
    console.log(err);
});