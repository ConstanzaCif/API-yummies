const express = require('express');
const router = express.Router();
const pedido_controller = require('../controllers/pedidos_controller')
const multer = require('multer');

//const storage = multer.memoryStorage();
//const upload = multer({ storage });


//router.post('/create', upload.single('imagen'), pedido_controller.create);
router.post('/create', pedido_controller.create);
router.post('/', pedido_controller.listAll);
router.get('/:id_pedido', pedido_controller.listOne);
router.put("/:id_pedido/estado/:estado", pedido_controller.cambiarEstado);
router.get('/search', pedido_controller.searchPedidos);
module.exports = router