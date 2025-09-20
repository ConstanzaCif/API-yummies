const express = require('express');
const router = express.Router();
const usuario_controller = require('../controllers/usuario_controller')

router.post('/', usuario_controller.createUsuario)
router.post('/login', usuario_controller.login)
router.put('/:id_usuario', usuario_controller.editarUsuario)

module.exports = router