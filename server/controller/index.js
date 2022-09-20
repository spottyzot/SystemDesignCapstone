const axios = require('axios');
const {readList, readInfo, readStyles, readRelated} = require('../model/index.js');


module.exports = {
  getList: (req, res) => {
    const {page, count} = req.query;
    readList(page, count)
    .then((list) => {
      res.send(list);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  },

  getInfo: (req, res) => {
    const {product_id} = req.params;
    readInfo(product_id)
    .then((info) => {
      res.send(info);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  },

  getStyles: (req ,res) => {
    const {product_id} = req.params;
    readStyles(product_id)
    .then((styles) => {
      res.send(styles);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  },

  getRelated: (req, res) => {
    const {product_id} = req.params;
    console.log(product_id)
    readRelated(product_id)
    .then((related) => {
      res.send(related.rows[0].array);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
  }
}