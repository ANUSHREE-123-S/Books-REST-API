const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store books
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) a book by ID
app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!title || !author) {
        return res.status(400).json({ message: "Title and author are required" });
    }

    book.title = title;
    book.author = author;

    res.json(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);

    const exists = books.some(b => b.id === bookId);

    if (!exists) {
        return res.status(404).json({ message: "Book not found" });
    }

    books = books.filter(b => b.id !== bookId);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
