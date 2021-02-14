const db = require('../Configs/db');
const product = {};


product.getAll= () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM public.product ORDER BY id DESC')
        .then((res) => {
          if (res.rows.length == 0) {
            resolve({msg :'Product is empty!'});
          } else {
            resolve(res.rows);
          };
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

product.get= (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.product WHERE id = '${id}'`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('Data not found');
          } else {
            resolve(res.rows);
          };
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


product.add = (data, image) =>{
    return new Promise((resolve, reject) =>{
        db.query(`INSERT INTO public.product(name, price, image, id_category) VALUES ('${data.name}',  ${data.price}, '${image}', '${data.id_category}')`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            reject("Data not completed")
        });
    });
};

product.update = (data, image) =>{
    return new Promise((resolve, reject) =>{
        db.query(`UPDATE public.product SET name='${data.name}', price=${data.price},  image='${image}', id_category='${data.id_category}' WHERE id=${data.id}`)
        .then((res) => {
            resolve(data)
        })
        .catch((err) => {
            reject("Check Data")
        });
    });
};


product.del= (id) =>{
    return new Promise((resolve, reject) =>{
        db.query(`DELETE FROM public.product WHERE id=${id}`)
        .then((res) => {
            resolve(id)
        })
        .catch((err) => {
            reject("id not found")
        });
    });
};



module.exports = product;



