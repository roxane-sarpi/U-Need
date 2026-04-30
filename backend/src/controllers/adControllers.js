const models = require("../models");

const browse = (req, res) => {
  models.ad
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.ad
    .find(req.params.id)
    .then(([rows]) => {
      if(rows[0] === null){
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch(() => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {browse, read};

