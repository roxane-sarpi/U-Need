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
router.post("/ads", adControllers.add);

//Categories
const CategoryControllers = require("./controllers/CategoryControllers");
router.get("/categories", CategoryControllers.browse);
router.get("/categories/:id", CategoryControllers.read);

//Users
const userControllers = require("./controllers/userControllers");
router.post("/users", userControllers.add);
router.get("/users/:id", userControllers.read);

//Notifications
const notificationsControllers = require("./controllers/notificationsControllers");
router.get("/notifications", notificationsControllers.browse);
router.post("/notifications", notificationsControllers.add);

//Messages
const messagesControllers = require("./controllers/messagesControllers");
router.post("/addmessages", messagesControllers.send);

module.exports = router;
