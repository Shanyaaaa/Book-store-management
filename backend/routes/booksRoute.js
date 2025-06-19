import express from 'express';
import { book } from '../models/bookModel.js';

const router = express.Router();

// ✅ CREATE a new book
router.post('/books', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: 'Please fill all fields' });
    }

    const newBook = await book.create({ title, author, publishYear });
    return res.status(201).send(newBook);

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// ✅ READ all books
router.get('/books', async (req, res) => {
  try {
    const books = await book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// ✅ READ a book by ID
router.get('/books/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const singleBook = await book.findById(id);

    if (!singleBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).json(singleBook);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// ✅ UPDATE a book
router.put('/books/:id', async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: 'Please fill all fields' });
    }

    const id = req.params.id;
    const result = await book.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book updated successfully', data: result });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// ✅ DELETE a book
router.delete('/books/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
