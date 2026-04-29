const express = require("express");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");
const adControllers =require("./controllers/adControllers");

// router.get("/items", itemControllers.browse);
router.get("/ads", adControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

module.exports = router;