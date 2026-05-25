const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword, verifyToken } = require("./auth");

//Public routes

//Users
const userControllers = require("./controllers/userControllers");
router.post("/users", hashPassword, userControllers.add);
router.post(
  "/users/login",
  userControllers.getUserbyEmailWithPasswordAndPassToNext,
  verifyPassword
);

//Ads
const adControllers =require("./controllers/adControllers");
router.get("/ads", adControllers.browse);
router.get("/ads/user/:id", adControllers.browseByUser);
router.get("/ads/:id", adControllers.read);

//Categories
const CategoryControllers = require("./controllers/CategoryControllers");
router.get("/categories", CategoryControllers.browse);
router.get("/categories/:id", CategoryControllers.read);


//Private routes

// Authentication wall : verifyToken is activated for each route after this line
router.use(verifyToken);

const requestControllers = require("./controllers/requestControllers");
router.post("/requests", requestControllers.addRequest);
router.get("/requests/helper/:id", requestControllers.browseByHelper);
router.get("/requests/history/:id", requestControllers.browseHistoryByUser);
router.get("/requests/:id", requestControllers.readRequest);
router.get("/requests", requestControllers.browseRequest);
router.delete("/requests/:id", requestControllers.destroyRequest);
router.put("/requests/:id", requestControllers.updateRequest);

//Users
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);

//Ads
router.post("/ads", adControllers.add);
router.delete("/ads/:id", adControllers.destroy);
router.put("/ads/:id", adControllers.edit);

//Categories
router.post("/categories", CategoryControllers.insert);
router.delete("/categories/:id", CategoryControllers.destroy);
router.put("/categories/:id", CategoryControllers.edit);

//Notifications
const notificationsControllers = require("./controllers/notificationsControllers");
router.get("/notifications", notificationsControllers.browse);
router.put("/notifications/:id", notificationsControllers.edit);
router.post("/notifications", notificationsControllers.add);
router.delete("/notifications/:id", notificationsControllers.destroy);

//Evaluations
const evaluationControllers = require("./controllers/evaluationControllers");
router.post("/evaluations", evaluationControllers.addEvaluation);
router.get("/evaluations/user/:id", evaluationControllers.readEvaluationsByUser);
router.put("/evaluations/:id", evaluationControllers.updateEvaluation);

//Messages
const messagesControllers = require("./controllers/messagesControllers");
router.post("/addmessages", messagesControllers.send);
router.put("/modifymessage/:id", messagesControllers.update);
router.get("/conversation/:id_request", messagesControllers.readConversation);
router.delete("/delete/conversation/:id_request", messagesControllers.deleteConversation);

module.exports = router;
