const models = require("../models");

const addRequest = async (req, res) => {
    const request = req.body;

    if (!request.id_ad || !request.id_helper || !request.id_user) {
        return res.status(400).json({ error: 'Données de requête incomplètes.' });
    }

  const lockKey = `request:${request.id_ad}:${Math.min(request.id_helper, request.id_user)}:${Math.max(request.id_helper, request.id_user)}`;
  const connection = await models.request.database.getConnection();

    try {
    const [lockRows] = await connection.query('SELECT GET_LOCK(?, 5) AS lock_acquired', [lockKey]);

    if (lockRows[0]?.lock_acquired !== 1) {
      return res.status(409).json({ error: 'Conversation déjà en cours de création.' });
    }

    const [existingRows] = await connection.query(
      `SELECT *
       FROM requests
       WHERE id_ad = ?
         AND ((id_helper = ? AND id_user = ?) OR (id_helper = ? AND id_user = ?))
       ORDER BY id DESC
       LIMIT 1`,
      [request.id_ad, request.id_helper, request.id_user, request.id_user, request.id_helper]
    );

    if (existingRows[0]) {
      return res.status(200).json(existingRows[0]);
    }

    const [result] = await connection.query(
      `INSERT INTO requests (id_ad, id_helper, id_user, status) VALUES (?, ?, ?, ?)`,
      [request.id_ad, request.id_helper, request.id_user, request.status]
    );

    const [createdRows] = await connection.query(
      `SELECT *
       FROM requests
       WHERE id = ?`,
      [result.insertId]
    );

    if (createdRows[0]) {
      return res.status(201).json(createdRows[0]);
    }

    return res.status(201).json({ id: result.insertId, ...request });
  } catch (err) {
    if (err?.code === 'ER_DUP_ENTRY') {
      try {
        const [duplicateRows] = await connection.query(
          `SELECT *
           FROM requests
           WHERE id_ad = ?
             AND ((id_helper = ? AND id_user = ?) OR (id_helper = ? AND id_user = ?))
           ORDER BY id DESC
           LIMIT 1`,
          [request.id_ad, request.id_helper, request.id_user, request.id_user, request.id_helper]
        );

        if (duplicateRows[0]) {
          return res.status(200).json(duplicateRows[0]);
        }
      } catch (lookupErr) {
        console.error(lookupErr);
      }
    }

    console.error(err);
    return res.sendStatus(500);
  } finally {
    try {
      await connection.query('SELECT RELEASE_LOCK(?)', [lockKey]);
    } catch (releaseErr) {
      console.error(releaseErr);
    }
    connection.release();
  }
};

const readRequest = (req, res) => {
      models.request
        .find(req.params.id)
        .then(([rows]) => {
          if (rows[0] == null) {
            res.sendStatus(404);
          } else {
            res.send(rows[0]);
          }
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    };

const browseRequest = (req, res) => {
  models.request
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    }
    )
}

// const updateRequest = async (req, res) => {
//     const request = {
//         id: req.params.id,
//         status: req.body.status,
//     };

//     // 1. Autoriser tous les statuts valides de l'ENUM
//     if (!['en cours', 'accepté', 'refusé', 'terminé', 'signalé'].includes(request.status)) {
//         return res.status(400).json({ error: 'Statut de requête invalide.' });
//     }

//     try {
//         const [[existingRequest]] = await models.request.findById(request.id);
//         if (!existingRequest) {
//             return res.sendStatus(404);
//         }

//         // Sauvegarde du nouveau statut de la requête
//         await models.request.update(request);

//         // 2. Si le propriétaire accepte l'aide de cet utilisateur
//         if (request.status === 'accepté') {
//             await models.ad.updateStatus(existingRequest.id_ad, 'en cours');
//             await models.request.refuseOtherRequestsByAd(existingRequest.id_ad, request.id);
//         }

//         // 3. Si le service est marqué comme validé et terminé
//         if (request.status === 'terminé') {
//             await models.ad.updateStatus(existingRequest.id_ad, 'terminé');
//             await models.user.updateHelperPoints(existingRequest.id_helper);
//             await models.user.updateNeederPoints();
//             // C'est ici que tu pourras déclencher ultérieurement ta fonction de transfert de points !
//         }

//         res.sendStatus(204);
//     } catch (err) {
//         console.error(err);
//         res.sendStatus(500);
//     }
// }
const updateRequest = async (req, res) => {
    const request = {
        id: req.params.id,
        status: req.body.status,
    };

    if (!['en cours', 'accepté', 'refusé', 'terminé', 'signalé'].includes(request.status)) {
        return res.status(400).json({ error: 'Statut de requête invalide.' });
    }

    try {
        // 1. On récupère la requête de mise en relation existante
        const [[existingRequest]] = await models.request.findById(request.id);
        if (!existingRequest) {
            return res.sendStatus(404);
        }

        // On bloque si le service est déjà terminé pour éviter la triche/doubles transactions
        if (existingRequest.status === 'terminé') {
            return res.status(400).json({ error: 'Ce service a déjà été clôturé et payé.' });
        }

        // Sauvegarde du nouveau statut de la requête
        await models.request.update(request);

        // Si le propriétaire accepte l'aide de cet utilisateur
        if (request.status === 'accepté') {
            await models.ad.updateStatus(existingRequest.id_ad, 'en cours');
            await models.request.refuseOtherRequestsByAd(existingRequest.id_ad, request.id);
        }

        // 🚀 2. Si le service est marqué comme validé et terminé
        if (request.status === 'terminé') {
            // On va chercher l'annonce pour récupérer le nombre exact de points à transférer
            const [[associatedAd]] = await models.ad.find(existingRequest.id_ad);
            
            if (!associatedAd) {
                return res.status(404).json({ error: "Annonce associée introuvable." });
            }

            const pointsToTransfer = associatedAd.points;

            // On met à jour le statut de l'annonce à terminé
            await models.ad.updateStatus(existingRequest.id_ad, 'terminé');
            
            // On déclenche le transfert de points entre le Needer (existingRequest.id_user) et le Helper (existingRequest.id_helper)
            await models.user.updatePointsTransaction(
                existingRequest.id_user,   // Le demandeur qui perd les points
                existingRequest.id_helper, // L'aidant qui gagne les points
                pointsToTransfer           // Le montant de l'annonce
            );
        }

        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

const browseHistoryByUser = (req, res) => {
  models.request
    .findHistoryByUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseConversationsByUser = (req, res) => {
  models.request
    .findConversationsByUser(req.params.id)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByHelper = (req, res) => {
  models.request
    .findByHelper(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};



exports = module.exports = {
    addRequest,
    readRequest,
    browseRequest,
    browseByHelper,
    browseHistoryByUser,
    updateRequest,
    browseConversationsByUser,
};