const models = require("../models");

const browse = (req, res) => {
  const userId = req.auth.userId; // Assuming you have authentication middleware that sets req.auth.userId
  models.notification
    .readByUserId(userId)
    .find (req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
 const notification = req.body; 

 notification.id = parseInt(req.params.id, 10); 

 models.notification
  .update(notification) 
  .then(([result]) => {
   if (result.affectedRows === 0) {
    res.sendStatus(404);
   } else {
    res.sendStatus(204);
   }
 })};
 
const add = (req, res) => {
const notification = req.body; 

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

const destroy = (req, res) => {
  models.notification
    .delete(req.params.id)
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

module.exports = {browse,add,edit,destroy};

