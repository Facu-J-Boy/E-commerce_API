const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(morgan('dev'));

module.exports = app;
