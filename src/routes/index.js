const { Router } = require('express');
// Importar todos los routers;

const productMiddleware = require('./productRoutes');
const reviewMiddleware = require('./reviewRoutes');
const categoryMiddleware = require('./categoryRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/product', productMiddleware);
router.use('/review', reviewMiddleware);
router.use('/category', categoryMiddleware);

module.exports = router;
