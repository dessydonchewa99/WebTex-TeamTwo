const Paint = require('../models/paints');

async function addPaint(title, isPublic, allowedUsers, content, createdBy) {
    const guid = `${title}-${new Date().toISOString()}`;

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
    
    try {
        await paint.save();
    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}

async function getPaintById(id) {

    var paint = null;
    await Paint.findOne({id: id}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            //console.log(result)
            paint = result;
        }
    });

    return paint;
}
async function deletePaintById(id) {
    var isDeleted = false;
    await Paint.findOneAndDelete({'id': id}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            
            isDeleted = true;

        }
    });

    return isDeleted;
}

async function getAllowedPaintsByUser(owner, currentUser) {
    var paints = null;
    await Paint.find(
        {
            $and: [
                {createdBy: owner},
                { $or: [
                    {isPublic: true},
                    {allowedUsers: {$in: [currentUser]}}
                ]}
            ]
        }, 
        'id title content createdBy isPublic allowedUsers', function(err, result) {
            if (err) {
                console.log(err);
            }
            paints = result;
    });

    return paints;
}

async function getPaintsByUser(owner) {
    var paints = null;
    await Paint.find({createdBy: owner}, 'id title content createdBy', function(err, result) {
        
        paints = result;
    });
    
    return paints;
}
module.exports = {
    addPaint,
    getPaintById,
    deletePaintById,
    getAllowedPaintsByUser,
    getPaintsByUser
};
