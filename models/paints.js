const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paintSchema = new Schema({
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
    }
}, {timestamps: true});

const Paint = mongoose.model('Paint', paintSchema);
module.exports = Paint;