const Paint = require('../models/paints');
const Guids = require('js-guid');

async function addPaint(title, isPublic, allowedUsers, content, createdBy) {
    const guid = Guids.Guid.newGuid();
    
    const paint = new Paint({
        id: guid,
        title: title,
        isPublic: isPublic,
        allowedUsers: allowedUsers,
        createdBy: createdBy
    });

    paint.content = {
        data: content,
        contentType: "image/png"
    };
    let result = {isSuccessful: false};
    await paint.save()
        .then(x => {
            result.isSuccessful = true;
        }).catch(err => {
            
            result.errorMessage = Object.values(err.errors)[0].message;
            result.isSuccessful = false;
        });
    
    return result;
}

async function getPaintById(id) {

    var paint = await Paint.findOne({id: id}).exec();

    return paint;
}
async function deletePaintById(id, username) {
    var isDeleted = false;
    const result = await Paint.findOneAndDelete({'id': id, 'createdBy': username}).exec();
    if (result) {
        isDeleted = true;
    }
    return isDeleted;
}

async function getAllowedPaintsByUser(currentUser, properties) {
    const paints = await Paint.find(
        {
            $or: [
                {isPublic: true},
                {allowedUsers: {$in: [currentUser]}},
                {createdBy: currentUser}
            ]
        }, 
        properties).exec();
    
    return paints;
}

async function getPaintsByUser(owner, properties) {
    const paints = await Paint.find({createdBy: owner}, properties).exec();
    
    return paints;
}
module.exports = {
    addPaint,
    getPaintById,
    deletePaintById,
    getAllowedPaintsByUser,
    getPaintsByUser
};
