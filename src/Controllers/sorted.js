const sorted = {};
const model = require('../Models/sorted');
const response = require('../Helpers/response');

sorted.getName = async (req, res) => {
  try {
    const Query = `
        SELECT public.product.id, public.product.name, public.product.price, public.product.image, public.category.name AS "category"
        FROM public.product
        JOIN public.category ON public.product.id_category = public.category.id
        `;

    let queryData = '';

    if (Object.keys(req.params).length === 0) {
      queryData = '';
    } else {
      queryData = `WHERE product.name LIKE '%${req.params.name}%'`;
    }

    const result = await model.get(Query, queryData);
    console.log(result)
    return response(res, 200, result);
  } catch (error) {
      console.log(error)
    return response(res, 500, error);
  }
};

sorted.get = async (req, res) => {
  try {
    const Query = `
    SELECT public.product.id, public.product.name, public.product.price, public.product.image, public.category.name AS "category"
    FROM public.product
    JOIN public.category ON public.product.id_category = public.category.id
        `;

    let queryData = '';

    if (req.query.name === 'ASC' || req.query.name === 'DESC' || req.query.category === 'ASC' || req.query.category === 'DESC' || req.query.new === 'ASC' || req.query.new === 'DESC' || req.query.price === 'ASC' || req.query.price === 'DESC') {
      queryData = 'ORDER BY';

      if (req.query.name === 'ASC') {
        queryData += ' public.product.name ASC';
      }
      if (req.query.name === 'DESC') {
        queryData += ' public.product.name DESC';
      }

      if (req.query.category === 'ASC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC') {
          queryData += ', public.category.name ASC';
        } else {
          queryData += ' public.category.name ASC';
        }
      }
      if (req.query.category === 'DESC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC') {
          queryData += ', public.category.name DESC';
        } else {
          queryData += ' public.category.name DESC';
        }
      }

      if (req.query.new === 'ASC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC' || req.query.category === 'ASC' || req.query.category === 'DESC') {
          queryData += ', public.product.id ASC';
        } else {
          queryData += ' public.product.id ASC';
        }
      }
      if (req.query.new === 'DESC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC' || req.query.category === 'ASC' || req.query.category === 'DESC') {
          queryData += ', public.product.id DESC';
        } else {
          queryData += ' public.product.id DESC';
        }
      }

      if (req.query.price === 'ASC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC' || req.query.category === 'ASC' || req.query.category === 'DESC' || req.query.new === 'ASC' || req.query.new === 'DESC') {
          queryData += ', price ASC';
        } else {
          queryData += ' price ASC';
        }
      }
      if (req.query.price === 'DESC') {
        if (req.query.name === 'ASC' || req.query.name === 'DESC' || req.query.category === 'ASC' || req.query.category === 'DESC' || req.query.new === 'ASC' || req.query.new === 'DESC') {
          queryData += ', price DESC';
        } else {
          queryData += ' price DESC';
        }
      }
    } else {
      queryData = '';
    }
    const result = await model.get(Query, queryData);
    console.log(result)
    return response(res, 200, result);
  } catch (error) {
    return response(res, 500, error);
  }
};

module.exports = sorted;