const router = require('express').Router()

const RateCurrency = require('./controllerRate')

router.get('/rates', RateCurrency);
module.exports = router