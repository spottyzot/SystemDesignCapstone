const axios = require('axios');
const pool = require('../connection.js');


module.exports = {

  readList: (page = 1, count = 5) => {
    return pool.connect()
      .then((client) => {
        const queryStr = 'Select * from products limit $2 offset $1';
        return client.query(queryStr, [page * count - count, count])
          .then((list) =>  {
            client.release();
            console.log(list.rows);
            return list.rows;
            })
          .catch((err) => {
            client.release();
            console.err(err);
          })
      })
  },

  readInfo: (productID) => {
    return pool.connect()
      .then((client) => {
        const queryStr = "select *, array(select json_build_object('feature', feature, 'value', value) from features where features.product_id = products.id) as features from products where products.id = $1";
        return client.query(queryStr, [productID])
        .then((info) => {
          client.release();
          console.log(info.rows[0]);
          return info.rows[0]
        })
        .catch((err) => {
          client.release();
          throw err;
        })
      })
  },

  readStyles: (productID) => {
    return pool.connect()
    .then((client) => {
      const queryStr = "select products.id, array(select json_build_object('style_id', style_id, 'name', name, 'original_price', original_price, 'sale_price', sale_price, 'default?', default_style, 'photos', array(select json_build_object('thumbnail_url', thumbnail_url, 'url', url) from photos where photos.styleId = styles.style_id), 'skus', (select json_object_agg(skus.sku_id, json_build_object('quantity', quantity, 'size', size)) from skus where skus.styleId = styles.style_id)) from styles where styles.productId = products.id) as results from products where products.id = $1";
      return client.query(queryStr, [productID])
      .then((info) => {
        client.release();
        return info.rows[0];
      })
      .catch((err) => {
        client.release();
        throw err;
      })
    })
  },

  readRelated: (productID) => {
    return pool.connect()
    .then((client) => {
      const queryStr = 'select array(select (related_product_id) from related_products where related_products.current_product_id = $1)';
      return client.query(queryStr, [productID])
      .then((info) => {
        client.release();
        return info;
      })
      .catch((err) => {
        client.release();
        throw err;
      })
    })
  }
}