const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paintSchema = new Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    content:
    {
        data: String,
        contentType: String
    },
    createdBy: { // Username
        type: String
    },
    isPublic: {
        type: Boolean
    },
    allowedUsers: {
        type: Array
    }
}, {timestamps: true});

const Paint = mongoose.model('Paint', paintSchema);
module.exports = Paint;