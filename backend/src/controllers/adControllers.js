const models = require("../models");

const browse = (req, res) => {
  models.ad
    .findAllWithDetails()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
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
    .catch(() => {
      res.sendStatus(500);
    });
};

const browseRecent = (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 4;
  models.ad
    .findRecent(limit)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
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

  // debug logs removed

  models.ad
    .insert(ad)
    .then(([result]) => {
      res.location(`/ads/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Erreur lors de la création de l annonce', detail: err && err.message });
    });
}

const edit = (req, res) => {
  const updatedFields = req.body;
  const adId = parseInt(req.params.id, 10);

  models.ad
    .findByIdWithDetails(adId)
    .then(([rows]) => {
      const existingAd = rows[0];

      if (!existingAd) {
        return res.sendStatus(404);
      }

      const fields = [
        "title",
        "description",
        "image_1",
        "image_2",
        "image_3",
        "id_category",
        "points",
        "status",
        "zip_code",
        "city",
        "urgent",
        "date_execution",
      ];

      const ad = { id: adId };
      for (const field of fields) {
        ad[field] = field in updatedFields ? updatedFields[field] : existingAd[field];
      }

      return models.ad.update(ad);
    })
    .then(([result]) => {
      if (!result || result.affectedRows === 0) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(500);
    });
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
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports = {browse, browseRecent, browseByUser, read, add, edit, destroy};

