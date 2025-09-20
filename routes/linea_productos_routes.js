const express = require('express');
const router = express.Router();
const lineas_producto_controller = require('../controllers/linea_productos_controller');

router.get('/', lineas_producto_controller.listarLineasProducto);
router.post('/', lineas_producto_controller.crearLineaProducto)
router.put('/:id_linea_productos',lineas_producto_controller.actualizarLineaProducto);
router.delete('/:id_linea_productos',lineas_producto_controller.desactivarLineaProducto);

module.exports = router;