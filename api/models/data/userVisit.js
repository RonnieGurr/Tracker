const mongoose = require('mongoose');

const userVisit = mongoose.Schema({
    name: {
        type: String,
        default: 'userVisit'
    },
    tags: {
        type: String,
        required: false,
        default: ''
    },
    url: {
        type: String,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('userVisit', userVisit, 'data');