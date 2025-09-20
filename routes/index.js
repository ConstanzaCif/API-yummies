const express = require('express');
const router = express.Router();

// const exampleRouter = require('./exampleRouter');

// router.use('/example', exampleRouter);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;