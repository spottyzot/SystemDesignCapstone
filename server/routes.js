const router = require('express').Router()
const {getList, getInfo, getStyles, getRelated} = require('./controller/index.js');

router.get('/', getList);

router.get('/:product_id', getInfo);

router.get('/:product_id/styles', getStyles);

router.get('/:product_id/related', getRelated);


module.exports = router;