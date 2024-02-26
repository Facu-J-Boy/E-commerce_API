const { Router } = require('express');
// Importar todos los routers;

const textMiddleware = require('./textRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/text', textMiddleware);

module.exports = router;
