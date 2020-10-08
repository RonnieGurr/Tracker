const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const auth = require('./helpers/auth');

const router = express.Router();

router.post('/', auth.authRefresh, (req, res) => {
    
})

module.exports = router;