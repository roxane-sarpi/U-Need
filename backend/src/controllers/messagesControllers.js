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
      console.log("Messages récupérés :", rows);
      res.json(rows || []);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur serveur lors de la récupération des messages");
    });
};

const deleteConversation = async (req, res) => {
  const { id_request } = req.params;
  const currentUserId = Number(req.payload?.sub);

  try {
    const [[request]] = await models.request.findById(id_request);

    if (!request) {
      return res.status(404).send("Conversation introuvable");
    }

    const isAdOwner = request.ad_owner_id === currentUserId;
    const isHelper = request.id_helper === currentUserId;

    if (!isAdOwner && !(isHelper && request.status !== 'en cours')) {
      return res.status(403).send("Vous n'êtes pas autorisé à supprimer cette conversation");
    }

    const [result] = await models.messages.delete(id_request);

    if (result.affectedRows === 0) {
      // no messages, but we may still want to remove the request if allowed
      // fall through to attempt request deletion when appropriate
    }

    // If the current user is allowed to delete the request as well (ad owner or helper when not 'en cours'), delete it
    const shouldDeleteRequest = isAdOwner || (isHelper && request.status !== 'en cours');

    if (shouldDeleteRequest) {
      await models.request.delete(id_request);
      return res.status(200).send(`Conversation et requête ${id_request} supprimées`);
    }

    return res.status(200).send(`Conversation ${id_request} supprimée avec succès`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la suppression de la conversation");
  }
};

module.exports = {
  send,
  update,
  readConversation,
  deleteConversation
};