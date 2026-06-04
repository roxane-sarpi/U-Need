const models = require("../models");

const browse = (req, res) => {
  models.ad
    .findAllWithDetails()
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
    .findByIdWithDetails(req.params.id)
    .then(([rows]) => {
      if (!rows[0]) {
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

const browseByUser = (req, res) => {
  models.ad
    .findByUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const ad = req.body;
  ad.date_execution = ad.date_execution || null;

  if (req.files) {
    ad.image_1 = req.files.image_1 ? `/uploads/${req.files.image_1[0].filename}` : null;
    ad.image_2 = req.files.image_2 ? `/uploads/${req.files.image_2[0].filename}` : null;
    ad.image_3 = req.files.image_3 ? `/uploads/${req.files.image_3[0].filename}` : null;
  }

  models.ad
  .insert(ad)
  .then(([result]) => {
    res.location(`/ads/${result.insertId}`).sendStatus(201);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
}

const edit = (req, res) => {
  const ad = req.body;

  ad.id = parseInt(req.params.id, 10);

  models.ad
    .update(ad)
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
    })
  ;
};

const destroy = (req, res) => {
  models.ad
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

module.exports = {browse, browseByUser, read, add, edit, destroy};

