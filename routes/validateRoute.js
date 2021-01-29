const express = require('express');
const validateRouteController = require('../controllers/validateRouteController');
const bodyParser = require('body-parser');
const router = express.Router();

// Post /validate-rule
router.use(bodyParser.json());
// router.use(bodyParser.)
router.post('/validate-rule', validateRouteController.validateRoute);

module.exports = router;