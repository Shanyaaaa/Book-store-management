import express from 'express';

const router = express.Router();


// route to save book in db
router.post("/books", async (req, res) => {
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

//ROUTE FOR GETTING ALL BOOKS FROM DATABASE
router.get('/books', async (req, res) => {
    try {
        const books = await book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,

        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message }); 
        }
});
//ROUTE TO GET ONE BOOK BY ID
router.get('/books/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const books = await book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,

        });

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message }); 
        }
});

//update a book
router.put ('/books/:id', async (req, res) => {
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
    const id = req.params;
    const result = await book.findByIdAndUpdate(id, req.body);

    if (!result) {
        return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({message:'book updated successfully'});
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: err.message });
            }
            });
       

//TO DELETE A BOOK
router.delete('/books/:id', async (req, res) =>{
    try {
        const id = req.params;
        const result = await book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
            }
            return res.status(200).send({message:'book deleted successfully'});
        } catch (err){
            console.log(err.message);
            res.status(500).send({ message: err.message });
        }  
});



