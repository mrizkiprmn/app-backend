const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/product");
const validate = require ("../middleware/validate")
const upload = require ("../middleware/multer")
const cache = require("../middleware/cache")

routes.get('/',validate(["admin","customer"]),cache,ctrl.getAll);
routes.post("/",validate(["admin"]),upload.single("image"),ctrl.add);
routes.put("/",validate(["admin"]),upload.single("image"),ctrl.update);
routes.delete("/:id",validate(["admin"]),ctrl.del);

module.exports = routes;

// validate(["admin", "users"]),
// validate (["admin"]),