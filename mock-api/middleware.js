const publishers = require('./data/publishers.json');
const authors = require('./data/authors.json');
const books = require('./data/books.json');
const evangelizandos = require('./data/evangelizandos.json');


module.exports = [
  function (req, res, next) {
    let response;
    switch (req._parsedUrl.pathname) {
      case '/publishers':
        response = getPublishers();
        break;
      case '/authors':
        response = getAuthors();
        break;
      case '/books':
        response = getBooks();
        break;
      case '/evangelizandos':
        response = getEvangelizandos();
        break;
      default:
        return next();
    }
    res.send(response);
    res.end();
  },
];

function getPublishers() {
  return publishers
}

function getAuthors() {
  return authors
}

function getBooks() {
  return books
}

function getEvangelizandos() {
  return evangelizandos
}
