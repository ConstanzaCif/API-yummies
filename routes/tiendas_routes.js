const express = require('express');
const router = express.Router();
const tiendasController = require('../controllers/tiendas_controller');

router.get('/', tiendasController.listarTiendas);
router.get('/:id_tiendas', tiendasController.obtenerTienda);
router.post('/',tiendasController.crearTienda);
router.put('/:id_tiendas',tiendasController.actualizarTienda);
router.delete('/:id_tiendas',tiendasController.desactivarTienda);


module.exports = router;