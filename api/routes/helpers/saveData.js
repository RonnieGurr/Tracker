const { response } = require('express');
const userVisit = require('../../models/data/userVisit');
const visitLength = require('../../models/data/visitLength');

module.exports = {
    save: function save(req, res) {
        switch(req.body.dataType) {
        case 'userVisit':
            var data = new userVisit({
                tags: req.body.data.tags,
                url: req.body.data.url
            })
            data.save().then(response => {
                res.sendStatus(201)
            }).catch(err => {
                res.sendStatus(400)
            })
            break
        case 'visitLength':
            var data = new visitLength({
                tags: req.body.data.tags,
                url: req.body.data.url,
                visitLength: req.body.data.visitLength
            })
            data.save().then(response => {
                res.sendStatus(201)
            }).catch(err => {
                res.sendStatus(400)
            })
            break

        default: 
            res.sendStatus(404)
            break
        }
    }
}