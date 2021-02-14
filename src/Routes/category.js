const express = require("express");
const routes = express.Router();
const validate = require('../middleware/validate');
const ctrl = require("../Controllers/category");


routes.get('/',validate(["admin", "customer"]),ctrl.get);
routes.post("/",validate(["admin"]), ctrl.add);
routes.put("/",validate(["admin"]), ctrl.update);
routes.delete("/:id", validate(["admin"]),ctrl.del);

module.exports = routes;