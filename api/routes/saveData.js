require('dotenv').config
const express = require('express');
const auth = require('./helpers/auth');
const Data = require('../models/data/searchData');
const saveData = require('./helpers/saveData');


const router = express.Router();

router.post('/', auth.authToken, (req, res) => {
    if (req.body.dataType && req.body.data) {
        saveData.save(req, res)
    } else {
        res.sendStatus(400)
    }
})

module.exports = router;
