const models = require("../models");

// --- FONCTION POUR CRÉER (POST) ---
const send = (req, res) => {
  const messages = req.body;

  if (!messages || !messages.content) {
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
    .catch(() => {
      res.status(500).send("Erreur serveur lors de la mise à jour");
    });
};

const readConversation = (req, res) => {
  const { id_request } = req.params;

  models.messages
    .read(id_request)
    .then(([rows]) => {
      res.json(rows || []);
    })
    .catch(() => {
      res.status(500).send("Erreur serveur lors de la récupération des messages");
    });
};

const deleteConversation = (req, res) => {
  const { id_request } = req.params;
  const currentUserId = Number(req.payload?.sub);

  // 1. On récupère la requête
  models.request.findById(id_request)
    .then(([[request]]) => {
      if (!request) {
        // On utilise 'return' pour arrêter proprement la chaîne ici
        return res.status(404).send("Conversation introuvable");
      }

      // 2. Vérification des rôles
      const isAdOwner = request.ad_owner_id === currentUserId;
      const isHelper = request.id_helper === currentUserId;

      if (!isAdOwner && !(isHelper && request.status !== 'en cours')) {
        return res.status(403).send("Vous n'êtes pas autorisé à supprimer cette conversation");
      }

      return models.messages.delete(id_request);
    })
    .then((result) => {
      if (res.headersSent) return;

      // 4. Deuxième delete : la requête principale
      return models.request.delete(id_request);
    })
    .then(() => {
      if (res.headersSent) return;

      return res.status(200).send(`La conversation et la requête ${id_request} ont été supprimées avec succès`);
    })
    .catch(() => {
      if (!res.headersSent) {
        res.status(500).send("Erreur serveur lors de la suppression de la conversation");
      }
    });
};


module.exports = {
  send,
  update,
  readConversation,
  deleteConversation
};