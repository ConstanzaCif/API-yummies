const express = require('express');
const router = express.Router();

const productosRoutes = require('./productos_routes');
const lineaProductoRoutes = require('./linea_productos_routes');

router.use('/productos', productosRoutes);
router.use('/lineaProductos', lineaProductoRoutes);

router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;