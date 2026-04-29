const models = require("../models");

const browse = (req, res) => {
  models.notification
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
const notification = req.body; 

 // TODO validations (length, format...)

models.notification
  .insert(notification) 
  .then(([result]) => {
   res.location(`/notifications/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
   console.error(err);
   res.sendStatus(500);
  });
};

module.exports = {browse, add};

