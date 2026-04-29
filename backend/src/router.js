const express = require("express");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
const adControllers =require("./controllers/adControllers");

// router.get("/items", itemControllers.browse);
router.get("/ads", adControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

// module.exports = router;

const CategoryControllers = require("./controllers/CategoryControllers");
const userControllers = require("./controllers/userControllers");

router.get("/categories", CategoryControllers.browse);
router.post("/users", userControllers.add);

const notificationsControllers = require("./controllers/notificationsControllers");
router.get("/notifications", notificationsControllers.browse);
router.post("/notifications", notificationsControllers.add);


const messagesControllers = require("./controllers/messagesControllers");
router.post("/addmessages", messagesControllers.send);

module.exports = router;
