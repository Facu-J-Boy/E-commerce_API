const optionCors = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'Authorization',
  ],
};

module.exports = { optionCors };
