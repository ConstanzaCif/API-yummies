const express = require('express');
const router = express.Router();
const pedido_controller = require('../controllers/pedidos_controller')

router.post('/create', pedido_controller.create)
router.post('/', pedido_controller.listAll)

module.exports = router