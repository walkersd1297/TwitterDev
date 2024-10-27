const express = require('express');
const router = express.Router();

const apiv1Routes = require('./v1/index.js');

router.use('/v1',apiv1Routes);

module.exports = router;