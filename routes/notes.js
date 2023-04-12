const nt = require('express').Router();
// Import the fsUtils functions
const { readAndAppend, readFromFile, readAndDelete} = require('../helpers/fsUtils');
// Import the uuid package to generate a unique identifier using the version 4 UUID algorithm
const { v4: uuidv4 } = require('uuid');

// Get Route for retrieving all the notes in the db.json and return all saved notes as JSON
nt.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Post Route for adding a new note
nt.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    const newNote = {
        title,
        text,
        id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in adding note');
  }
});

// Delete Route for deleting a note
nt.delete('/:id', (req, res) => {
  if (req.params.id) {
    const id = req.params.id;
    readAndDelete(id, './db/db.json');
    res.send(`Note with ID ${id} deleted`);
  } else {
    res.status(400).send('Note ID not provided');
  }
});

module.exports = nt;