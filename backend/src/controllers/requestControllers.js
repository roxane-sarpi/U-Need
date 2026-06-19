const models = require("../models");

const addRequest = (req, res) => {
    const request = req.body;

    models.request
        .create(request)
        .then(([result]) => {
            res.location(`/requests/${result.insertId}`).sendStatus(201);
        })
        .catch(() => {
          res.sendStatus(500);
        });
}

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
        .catch(() => {
          res.sendStatus(500);
        });
    };

const browseRequest = (req, res) => {
  models.request
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    }
    )
}

const updateRequest = async (req, res) => {
    const request = {
        id: req.params.id,
        status: req.body.status,
    };

    if (!['en cours', 'accepter', 'refuser'].includes(request.status)) {
        return res.status(400).json({ error: 'Statut de requête invalide.' });
    }

    try {
        const [[existingRequest]] = await models.request.findById(request.id);
        if (!existingRequest) {
            return res.sendStatus(404);
        }

        await models.request.update(request);

        if (request.status === 'accepter') {
            await models.ad.updateStatus(existingRequest.id_ad, 'en cours');
            await models.request.refuseOtherRequestsByAd(existingRequest.id_ad, request.id);
        }

        res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
}

const browseHistoryByUser = (req, res) => {
  models.request
    .findHistoryByUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const browseConversationsByUser = (req, res) => {
  models.request
    .findConversationsByUser(req.params.id)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const browseByHelper = (req, res) => {
  models.request
    .findByHelper(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
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