const publishers = require('./data/publishers.json');
const authors = require('./data/authors.json');
const books = require('./data/books.json');


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
      case '/file-engine/loan-restructuring-reports/2e9331a3-c4c0-450e-9ecb-99c9d7a74976/approve':
      case '/file-engine/loan-restructuring-reports/4fec98a2-999c-419f-895b-06456b8b634d/approve':
      case '/file-engine/loan-restructuring-reports/983782f7-8fad-4832-aa44-1dede4a7e413/approve':
        response = 'success';
        break;
      case '/file-engine/loan-restructuring-reports/2e9331a3-c4c0-450e-9ecb-99c9d7a74976/refuse':
      case '/file-engine/loan-restructuring-reports/4fec98a2-999c-419f-895b-06456b8b634d/refuse':
      case '/file-engine/loan-restructuring-reports/983782f7-8fad-4832-aa44-1dede4a7e413/refuse':
        response = 'success';
        break;
      case '/file-engine/loan-restructuring-reports/2e9331a3-c4c0-450e-9ecb-99c9d7a74976/notes':
      case '/file-engine/loan-restructuring-reports/4fec98a2-999c-419f-895b-06456b8b634d/notes':
      case '/file-engine/loan-restructuring-reports/983782f7-8fad-4832-aa44-1dede4a7e413/notes':
        response = 'success';
        break;
      case '/file-engine/loan-restructuring-reports/983782f7-8fad-4832-aa44-1dede4a7e413/generate-file':
        response = {
          message: '',
          details: [
            {
              target: 'ccn',
              message: 'AF00001',
            },
            {
              target: 'assignmentCode',
              message: '123',
            },
          ],
        };
        res.status(400);
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
