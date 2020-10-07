require('dotenv').config
const express = require('express');
const User = require('../models/User');
const md5 = require('md5')
const auth = require('./helpers/auth');

const router = express.Router();

router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        User.find({email: req.body.email}).then(data => {
            console.log(data)
            if (data.length > 0) {
                if (data[0].password === md5(req.body.password)) {
                    const user = {
                        email: data[0].email
                    }
                    
                    const accessToken = auth.genToken(user)
                    const refreshToken = auth.genRefresh(user)
                    res.json({token: accessToken, refreshToken: refreshToken})
    
                } else {
                    res.json(401)
                }
            } else {
                res.json(401)
            }
        }).catch(err => {
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(401)
    }
})

module.exports = router;
