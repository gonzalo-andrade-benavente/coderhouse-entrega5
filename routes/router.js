const { Router } = require('express');

const { home } = require('../controllers/productos');

const router = Router();

router.get('/', home);
//router.get('/productos', getProducto);
//router.post('/productos', addProducto);

module.exports = router;
