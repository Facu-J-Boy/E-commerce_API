const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const { SESSION_SECRET, COOKIE_NAME } = process.env;

require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: COOKIE_NAME,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use('/', routes);

module.exports = app;
