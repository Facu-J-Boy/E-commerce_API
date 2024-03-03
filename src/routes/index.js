const { Router } = require('express');
require('../middleware/google');
const passport = require('passport');
// Importar todos los routers;

const productMiddleware = require('./productRoutes');
const reviewMiddleware = require('./reviewRoutes');
const categoryMiddleware = require('./categoryRoutes');
const userMiddleware = require('./userRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/product', productMiddleware);
router.use('/review', reviewMiddleware);
router.use('/category', categoryMiddleware);
router.use(
  '/user',
  passport.authenticate('auth-google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    session: false,
  }),
  userMiddleware
);

module.exports = router;
