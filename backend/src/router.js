const express = require("express");

const router = express.Router();

//Ads
const adControllers =require("./controllers/adControllers");
router.get("/ads", adControllers.browse);
router.get("/ads", adControllers.browse);
router.get("/ads/:id", adControllers.read);

const CategoryControllers = require("./controllers/CategoryControllers");
router.get("/categories", CategoryControllers.browse);
router.get("/categories/:id", CategoryControllers.read);

const userControllers = require("./controllers/userControllers");
router.post("/users", userControllers.add);
router.get("/users/:id", userControllers.read);

const notificationsControllers = require("./controllers/notificationsControllers");
router.get("/notifications", notificationsControllers.browse);
router.put("/notifications/:id", notificationsControllers.edit);
router.post("/notifications", notificationsControllers.add);

const messagesControllers = require("./controllers/messagesControllers");
router.post("/addmessages", messagesControllers.send);
router.put("/modifymessage/:id", messagesControllers.update);
router.get("/conversation/:id_request", messagesControllers.readConversation);

module.exports = router;
