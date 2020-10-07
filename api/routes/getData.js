require('dotenv').config
const express = require('express');
const auth = require('./helpers/auth');
const Data = require('../models/Data');
const getData = require('./helpers/getData');

const router = express.Router();

router.post('/', auth.authToken, (req, res) => {
    if (req.body.data) {
        getData.loadData(req, res)
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;
