const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const passport = require('passport');
const session = require('express-session');
const { optionCors } = require('./config/corsConfig.js');
const path = require('path');
require('dotenv').config();

const { SESSION_SECRET, COOKIE_NAME } = process.env;

require('./db.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors(optionCors));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name: COOKIE_NAME,
    cookie: {
      secure: true, // Es importante usar 'secure' en producción para cookies con SameSite=None
      sameSite: 'None', // Configuración de SameSite=None para compartir cookies entre dominios
    },
  })
);
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
);
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/google.js')(passport);
app.use(morgan('dev'));
app.use('/', routes);
module.exports = app;
