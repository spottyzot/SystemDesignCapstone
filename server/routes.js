const router = require('express').Router()
const {getList, getInfo, getStyles, getRelated} = require('./controller/index.js');

router.get('/products', getList);

router.get('/products/:product_id', getInfo);

router.get('/products/:product_id/styles', getStyles);

router.get('/products/:product_id/related', getRelated);


module.exports = router;