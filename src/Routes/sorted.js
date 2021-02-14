const express = require('express');
const routes = express.Router();
const ctrl = require('../Controllers/sorted');
const validate = require('../middleware/validate');

routes.get('/', validate(['admin', 'customer']), ctrl.get);
routes.get('/:name', validate(['admin', 'customer']), ctrl.getName);

module.exports = routes;