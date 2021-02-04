const express = require("express");
const validate = require("../middleware/validate")
const routes = express.Router();
const ctrl = require("../Controllers/history");


routes.get('/',validate(["admin","users"]),ctrl.get);
routes.post("/",validate(["admin","users"]),ctrl.add);
routes.put("/", ctrl.update);
routes.delete("/:id",validate(["admin","users"]),ctrl.del);

module.exports = routes;