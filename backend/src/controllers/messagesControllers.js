const models = require("../models");

// --- FONCTION POUR CRÉER (POST) ---
const send = (req, res) => {
  const messages = req.body;

  if (!messages || !messages.content) {
    console.error("Erreur : Le contenu du message est vide.");
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

// --- FONCTION POUR METTRE À JOUR (PUT) ---
const update = (req, res) => {
  const message = req.body;
  const { id } = req.params;

  models.messages
    .update({ ...message, id }) // On s'assure que l'id est passé au modèle
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Message non trouvé");
      } else {
        res.status(200).json({ message: "Mise à jour réussie", id });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur serveur lors de la mise à jour");
    });
};

const readConversation = (req, res) => {
  const { id_request } = req.params;

  models.messages
    .read(id_request)
    .then(([rows]) => {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("Aucun message trouvé pour cette annonce");
      } else {
        console.log("Messages récupérés :", rows);
        res.json(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur serveur lors de la récupération des messages");
    });
};

const deleteConversation = (req, res) => {
  const { id_request } = req.params;

  models.messages
    .delete(id_request)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Aucun message à supprimer");
      } else {
        res.status(200).send(`Conversation ${id_request} supprimée avec succès`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  send,
  update,
  readConversation,
  deleteConversation
};