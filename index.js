const express = require('express');
const app = express();
const PORT = 3000; // You can change this port if needed

app.use(express.json());

// In-memory book list
let books = [{ "id": 1, "title": "Atomic Habits", "author": "James Clear" },
  { "id": 2, "title": "Deep Work", "author": "Cal Newport" }];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { title, author } = req.body;

  const book = books.find((b) => b.id == bookId);
  if (book) {
    book.title = title;
    book.author = author;
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  books = books.filter((b) => b.id != bookId);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

