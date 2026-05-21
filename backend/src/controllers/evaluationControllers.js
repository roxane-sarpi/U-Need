const models = require("../models");

const addEvaluation = (req, res) => {
  const evaluation = req.body;

  models.evaluation
    .create(evaluation)
    .then(([result]) => {
      res.location(`/evaluations/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readEvaluationsByUser = (req, res) => {
  models.evaluation
    .findByUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateEvaluation = (req, res) => {
  const evaluation = req.body;
  evaluation.id = req.params.id;

  models.evaluation
    .update(evaluation)
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
};

exports = module.exports = {
  addEvaluation,
  readEvaluationsByUser,
  updateEvaluation,
};
