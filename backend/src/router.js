const express = require("express");

const router = express.Router();


const adControllers =require("./controllers/adControllers");
router.get("/ads", adControllers.browse);


const CategoryControllers = require("./controllers/CategoryControllers");
const userControllers = require("./controllers/userControllers");

router.get("/categories", CategoryControllers.browse);
router.post("/users", userControllers.add);

const notificationsControllers = require("./controllers/notificationsControllers");
router.get("/notifications", notificationsControllers.browse);
router.post("/notifications", notificationsControllers.add);


const messagesControllers = require("./controllers/messagesControllers");
router.post("/addmessages", messagesControllers.send);
router.put("/modifymessage/:id", messagesControllers.update);

module.exports = router;
