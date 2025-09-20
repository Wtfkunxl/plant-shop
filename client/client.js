// client/client.js
const axios = require('axios');

const BASE = process.env.BASE_URL || 'http://localhost:3001';

// Task 10: Get all books – Using async/await (async callback style)
async function getAllBooksAsync() {
  try {
    const res = await axios.get(`${BASE}/books`);
    console.log('All books:', res.data);
    return res.data;
  } catch (err) {
    console.error('Error getting all books:', err.message);
    throw err;
  }
}

// Task 11: Search by ISBN – Using Promises
function searchByISBN(isbn) {
  return axios.get(`${BASE}/books/${isbn}`)
    .then(res => {
      console.log(`Book ${isbn}:`, res.data);
      return res.data;
    })
    .catch(err => {
      console.error(`ISBN ${isbn} error:`, err.response ? err.response.data : err.message);
      throw err;
    });
}

// Task 12: Search by Author (async/await)
async function searchByAuthor(author) {
  try {
    const res = await axios.get(`${BASE}/books/author/${encodeURIComponent(author)}`);
    console.log(`Books by "${author}":`, res.data);
    return res.data;
  } catch (err) {
    console.error('Error searching by author:', err.message);
    throw err;
  }
}

// Task 13: Search by Title (async/await)
async function searchByTitle(title) {
  try {
    const res = await axios.get(`${BASE}/books/title/${encodeURIComponent(title)}`);
    console.log(`Books with title "${title}":`, res.data);
    return res.data;
  } catch (err) {
    console.error('Error searching by title:', err.message);
    throw err;
  }
}

// Demo runner (uncomment call you want)
async function runDemo() {
  await getAllBooksAsync();
  await searchByAuthor('Rowling');
  await searchByTitle('Hobbit');
  try {
    await searchByISBN('9780261103573');
  } catch (e) {}
}

if (require.main === module) {
  runDemo().catch(() => {});
}

module.exports = { getAllBooksAsync, searchByISBN, searchByAuthor, searchByTitle };
