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
            console.log(err);
          })
      })
  },
//initial query: 140ms afterwards: <1s querytime


  readInfo: (productID) => {
    return pool.connect()
      .then((client) => {
        console.log(productID);
        const queryStr = "select *, array(select json_build_object('feature', feature, 'value', value) from features where features.product_id = products.product_id) as features from products where products.product_id = $1";
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
//initial query time: 35ms; after: <1ms querytime


  readStyles: (productID) => {
    return pool.connect()
    .then((client) => {
      const queryStr = "select products.product_id, array(select json_build_object('style_id', style_id, 'name', name, 'original_price', original_price, 'sale_price', sale_price, 'default?', default_style, 'photos', array(select json_build_object('thumbnail_url', thumbnail_url, 'url', url) from photos where photos.style_id = styles.style_id), 'skus', (select json_object_agg(skus.sku_id, json_build_object('quantity', quantity, 'size', size)) from skus where skus.style_id = styles.style_id)) from styles where styles.product_id = products.product_id) as results from products where products.product_id = $1";
      return client.query(queryStr, [productID])
      .then((info) => {
        client.release();
        console.log(info.rows[0])
        return info.rows[0];
      })
      .catch((err) => {
        client.release();
        throw err;
      })
    })
  },
  //initial query: 50000ms after: 3800-4000ms

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

//initial: 50ms, after: <1ms;