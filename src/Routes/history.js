const express = require("express");
const validate = require("../middleware/validate")
const routes = express.Router();
const ctrl = require("../Controllers/history");


routes.get('/',validate(["admin"]),ctrl.get);
routes.post("/",validate(["admin", "customer"]),ctrl.add);
routes.delete("/:id",validate(["admin"]),ctrl.del);

module.exports = routes;