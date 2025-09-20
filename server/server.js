// server/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { books } = require('./data/books');
const usersStore = require('./data/users');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'change_this_secret_in_prod';
const PORT = process.env.PORT || 3001;

/* -------------------------
  Helper: authenticate token
   Expects header: Authorization: Bearer <token>
--------------------------*/
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { username }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/* -------------------------
  Public endpoints (General users)
--------------------------*/

// Task 1: Get the book list available in the shop.
app.get('/books', (req, res) => {
  res.json(Object.values(books));
});

// Task 2: Get the books based on ISBN.
app.get('/books/:isbn', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Task 3: Get all books by Author.
app.get('/books/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();
  const matches = Object.values(books).filter(b => b.author.toLowerCase().includes(author));
  res.json(matches);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();
  const matches = Object.values(books).filter(b => b.title.toLowerCase().includes(title));
  res.json(matches);
});

// Task 5: Get book Review.
app.get('/books/:isbn/reviews', (req, res) => {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book.reviews || {});
});

/* -------------------------
  Authentication: register & login
--------------------------*/

// Task 6: Register New user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (usersStore.getUser(username)) return res.status(409).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 8);
  usersStore.addUser({ username, passwordHash: hashed });
  return res.json({ success: true, message: 'User registered' });
});

// Task 7: Login as a Registered user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const u = usersStore.getUser(username);
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

/* -------------------------
  Registered user actions (require token)
--------------------------*/

// Task 8: Add/Modify a book review.
app.put('/books/:isbn/review', authenticate, (req, res) => {
  const { isbn } = req.params;
  const { rating, text } = req.body;
  const username = req.user.username;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  book.reviews = book.reviews || {};
  // Add or modify review by username
  book.reviews[username] = { rating: rating || null, text: text || '', createdAt: new Date().toISOString() };
  return res.json({ success: true, reviews: book.reviews });
});

// Task 9: Delete review added by that particular user
app.delete('/books/:isbn/review', authenticate, (req, res) => {
  const { isbn } = req.params;
  const username = req.user.username;
  const book = books[isbn];
  if (!book) return res.status(404).json({ error: 'Book not found' });
  book.reviews = book.reviews || {};
  if (!book.reviews[username]) return res.status(404).json({ error: 'Review by user not found' });
  delete book.reviews[username];
  return res.json({ success: true, reviews: book.reviews });
});

/* -------------------------
  Start server
--------------------------*/
app.listen(PORT, () => {
  console.log(`Book API server running on http://localhost:${PORT}`);
});
