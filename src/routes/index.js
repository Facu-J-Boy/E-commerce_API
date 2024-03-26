const { Router } = require('express');
require('../middleware/google');
// Importar todos los routers;

const productMiddleware = require('./productRoutes');
const reviewMiddleware = require('./reviewRoutes');
const categoryMiddleware = require('./categoryRoutes');
const userMiddleware = require('./userRoutes');
const cartMiddleware = require('./cartRoutes');
const { verifyToken } = require('../middleware/verifyToken');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/product', verifyToken, productMiddleware);
router.use('/review', verifyToken, reviewMiddleware);
router.use('/category', verifyToken, categoryMiddleware);
router.use('/user', verifyToken, userMiddleware);
router.use('/cart', verifyToken, cartMiddleware);

module.exports = router;
