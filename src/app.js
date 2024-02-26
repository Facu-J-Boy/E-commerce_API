const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');

require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(morgan('dev'));
app.use('/', routes);

module.exports = app;
