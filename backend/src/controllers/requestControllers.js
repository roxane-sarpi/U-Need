const models = require("../models");

const addRequest = (req, res) => {
    const request = req.body;
    console.log(request);

    models.request
        .create(request)
        .then(([result]) => {
            res.location(`/requests/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
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

const updateRequest = (req, res) => {
    const request = req.body;
    request.id = req.params.id;
    console.log(request);

    models.request
        .update(request)
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
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