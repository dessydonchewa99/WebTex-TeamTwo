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

module.exports = {
    addPaint
};
