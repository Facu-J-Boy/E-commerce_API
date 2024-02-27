const { Router } = require('express');
// Importar todos los routers;

const productMiddleware = require('./productRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/product', productMiddleware);

module.exports = router;
