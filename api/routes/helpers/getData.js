const { response } = require('express');
const Data = require('../../models/Data');

module.exports = {
    loadData: function loadData(req, res) {
        Data.find({tags: req.body.data}, function(err, docs) {
            if (err) return res.sendStatus(500)
            if (!docs.length) return res.sendStatus(404)
            return res.json(docs)
        })
    }
}
