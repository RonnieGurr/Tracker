const mongoose = require('mongoose');

const data = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    pageVisits: {
        type: Number,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data', data, 'data');