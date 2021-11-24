const { Router } = require('express');
const { getProductos, 
        addProducto, 
        getProducto,
        updateProducto,
        deleteProducto } = require('../controllers/productos');

const router = Router();

router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', addProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;
