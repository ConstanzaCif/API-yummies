const express = require('express');
const router = express.Router();
const usuario_controller = require('../controllers/usuario_controller')

router.post('/', usuario_controller.createUsuario)
router.post('/login/web', usuario_controller.login_web)
router.post('/login/movil', usuario_controller.login_movil)
router.put('/:id_usuario', usuario_controller.editarUsuario)
router.get('/', usuario_controller.listAll)
router.get('/:id_usuario', usuario_controller.listOne)

module.exports = router