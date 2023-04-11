const express = require('express');
const path = require('path');
// Import the fsUtils functions
const { readAndAppend, readFromFile} = require('./helpers/fsUtils');
// Import the uuid package to generate a unique identifier using the version 4 UUID algorithm
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Get Route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for homepage
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Route for retrieving all the notes in the db.json and return all saved notes as JSON
app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Post Route for adding a new note
app.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const {title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    const newNote = {
        title,
        text,
        note_id: uuidv4(),
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

// Wildcard Route to homepage
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Start the Node.js server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);