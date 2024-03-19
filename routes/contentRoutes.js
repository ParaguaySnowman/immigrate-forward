const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cms.controller.js');

router.get('/asylum', cmsController.renderAsylum);

module.exports = router;