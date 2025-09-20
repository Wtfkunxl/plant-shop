// server/data/books.js
// Keyed by ISBN
const books = {
    '9780140328721': {
      isbn: '9780140328721',
      title: 'Matilda',
      author: 'Roald Dahl',
      reviews: { }, // username: { rating, text, createdAt }
      year: 1988,
      publisher: 'Puffin'
    },
    '9780439064873': {
      isbn: '9780439064873',
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
      reviews: {},
      year: 1998,
      publisher: 'Scholastic'
    },
    '9780261103573': {
      isbn: '9780261103573',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      reviews: {},
      year: 1937,
      publisher: 'Allen & Unwin'
    }
    // add more books as you like
  };
  
  module.exports = { books };
  