const models = require("../models");

const browse = (req, res) => {
  const userId = 1;
  models.notification
    .readByUserId(userId)
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
 })}
 
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

module.exports = {browse,add,edit};

