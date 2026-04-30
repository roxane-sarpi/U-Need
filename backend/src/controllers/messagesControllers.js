const models = require("../models");

const send = (req, res) => {

    console.log("Headers reçus :", req.headers['content-type']);
  console.log("Body brut reçu :", req.body);
  
      const messages = req.body;

if (!messages || !messages.content) {
    console.error("Erreur : Le contenu du message est vide ou mal formé.");
    return res.status(400).send("Message content is required");
  }
    models.messages
    .send(messages)
    .then(([result]) => {
      res.location(`/message/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
    send, 
};