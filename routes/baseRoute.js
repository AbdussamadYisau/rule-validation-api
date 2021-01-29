const express = require('express');
const baseRouteController = require('../controllers/baseRouteController');

const router = express.Router();

// Get /

router.get('/', baseRouteController.getBase);

module.exports = router;