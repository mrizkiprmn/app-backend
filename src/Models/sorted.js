const db = require('../Configs/db');

const sorted = {};

sorted.getName = (query, data) => new Promise((resolve, reject) => {
  db.query(`${query}${data}`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({
          id: 1, name: 'Product is Empty', image: '', price: '', category: 0,
        });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

sorted.get = (query, data) => new Promise((resolve, reject) => {
  db.query(`${query}${data}`)
    .then((res) => {
      if (res.rows.length === 0) {
        resolve({
          id: 1, name: 'Product is Empty', image: '', price: '0', category: 0,
        });
      } else {
        resolve(res.rows);
      }
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = sorted;