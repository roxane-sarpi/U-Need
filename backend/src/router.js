const express = require("express");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

//Ads
const adControllers =require("./controllers/adControllers");

router.get("/ads", adControllers.browse);
router.get("/ads/:id", adControllers.read);

//Categories
const CategoryControllers = require("./controllers/categoryControllers");

router.get("/categories", CategoryControllers.browse);


module.exports = router;