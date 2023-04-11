const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET (Wildcard) Route for homepage
app.get('*', (req, res) => 
  res.sendFile(path.json(_dirname, '/public/index.html'))
);

// Get Route for notes page
app.get('/notes', (req, res) => 
  res.sendFile(path.join(_dirname, '/public/notes.html'))
);

// Start the Node.js server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);