const mongoose = require('mongoose');

const visitLength = mongoose.Schema({
    name: {
        type: String,
        default: 'visitLength'
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
    visitLength: {
        type: Number,
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('visitLength', visitLength, 'data');