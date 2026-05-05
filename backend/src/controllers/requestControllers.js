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

exports = module.exports = {
    addrequest,
};