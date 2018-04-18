const express = require('express');
const app = express();
const animals = require('./routes/animals');

app.use(express.json());
app.use('/animals', animals);

module.exports = app;