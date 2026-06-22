const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  models.user
    .insert(user)
    .then(([result]) => {
      res.status(201).send({ ...user, id: result.insertId });
    })
    .catch((err) => {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'mail déjà utilisé' });
      } else {
        res.sendStatus(500);
      }
    });
};

const getUserbyEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email, password } = req.body;
  models.user
    .findByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstuser] = users;
        req.user = firstuser;
        next();
      } else {
        res.sendStatus(401); 
      }
    })
    .catch(() => {
      res.status(500).send("Error retrieving data from database");
    });
};

const read = (req, res) => {
  models.user
    .findById(req.params.id)
    .then(([rows]) => {
      if (rows[0]) {
        const { password, ...userWithoutPassword } = rows[0];
        res.send(userWithoutPassword);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  models.user
    .findById(req.params.id)
    .then(([rows]) => {
      if (!rows[0]) {
        return res.sendStatus(404);
      }

      const existingUser = rows[0];
      const user = {
        ...existingUser,
        ...req.body,
        id: req.params.id,
      };

      return models.user.update(user);
    })
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ success: true });
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ success: true });
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
};

module.exports = { browse, add, read, edit, destroy, getUserbyEmailWithPasswordAndPassToNext };
