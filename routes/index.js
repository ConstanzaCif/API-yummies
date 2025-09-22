const express = require('express');
const router = express.Router();

const productosRoutes = require('./productos_routes');
const lineaProductoRoutes = require('./linea_productos_routes');
const tiendasRoutes = require('./tiendas_routes');
const usuario_routes = require('./usuario_routes');
const pedidos_routes = require('./pedidos_routes')

router.use('/productos', productosRoutes);
router.use('/lineaProductos', lineaProductoRoutes);
router.use('/tiendas',tiendasRoutes)
router.use('/usuarios', usuario_routes);
router.use('/pedidos', pedidos_routes);

router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;