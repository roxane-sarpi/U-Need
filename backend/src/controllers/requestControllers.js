const models = require("../models");

const addrequest = (req, res) => {
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

const readrequest = (req, res) => {
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

const updaterequest = (req, res) => {
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

const destroyrequest = (req, res) => {
  models.request
    .delete(req.params.id)
    .then(([result]) => {
      if(result.affectedRows === 0){
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
        console.error(err);
        res.sendStatus(500);
    });
};


exports = module.exports = {
    addrequest,
    readrequest,
    updaterequest,
    destroyrequest
};