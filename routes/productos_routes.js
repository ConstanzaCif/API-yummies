const express = require('express');
const router = express.Router();
const productosController = require('../controllers/producto_controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname, '../uploads'));
    },
    filename:function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage});

router.get('/', productosController.listarProductos);
router.post('/', upload.single('imagen'), productosController.crearProducto);
router.put('/:id_producto', upload.single('imagen'), productosController.actualizarProducto);
router.delete('/:id_producto',productosController.desactivarProducto);

module.exports = router;
