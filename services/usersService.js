const User = require('../models/users');
const crypto = require('crypto');

async function checkUserCredentials(username, password) {
    if (!username || !password) {
        return false;
    }
    const hashedPassword = crypto.createHash('sha256').update(password).digest('base64');
    var isFound = false;
    const user = await User.findOne({username: username, password: hashedPassword}, 'username').exec();
    if (user) {
        isFound = true;
    }
    return isFound;
}

async function createUser(username, email, password) {

    var user = new User({
        username: username,
        email: email
    });
    var isCreated = false;
    const dbUser = await User.findOne({username: user.username}, 'username').exec();
    if(dbUser == null) {
        user.password = crypto.createHash('sha256').update(password).digest('base64');

        isCreated = true;
        await user.save();
    }
    return isCreated;
}

async function updateUserPassword(username, newPassword) {
    var newPass = crypto.createHash('sha256').update(newPassword).digest('base64');
    var isSuccessful = false;
    await User.updateOne({username: username}, { $set: {password: newPass}}, function(err, result) {
        isSuccessful = true;
    });

    return isSuccessful;
}

async function getUsers() {
    var users = await User.find({}, {username: 1}).exec();

    return users;
}
module.exports = {
    checkUserCredentials,
    createUser,
    updateUserPassword,
    getUsers
};
