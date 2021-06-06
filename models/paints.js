const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paintSchema = new Schema({
    id: {
        type: String,
        required: [true, 'Id is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [3, 'Title must contain at least 3 letters']
    },
    content:
    {
        data: {
            type: String,
            required: [true, 'Content data is required']
        },
        contentType: String
    },
    createdBy: { // Username
        type: String,
        required: [true, 'Paints requires creator']
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