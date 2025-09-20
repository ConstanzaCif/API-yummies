const express = require('express');
const router = express.Router();

const usuario_routes = require('./usuario_routes');

// const exampleRouter = require('./exampleRouter');

// router.use('/example', exampleRouter);

router.use('/usuarios', usuario_routes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;