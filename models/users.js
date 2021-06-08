const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;