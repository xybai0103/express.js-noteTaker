const express = require('express');

// Import the notes router
const notesRouter = require('./notes');

const app = express();

// Initialize notes route
app.use('/notes', notesRouter);

module.exports = app;