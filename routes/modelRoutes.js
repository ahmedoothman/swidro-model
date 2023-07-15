const express = require('express');

const modelController = require('./../controllers/modelController');
const router = express.Router();

router.post('/predict', modelController.predict);
module.exports = router;
