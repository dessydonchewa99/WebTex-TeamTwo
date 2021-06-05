const express = require('express');
const paintService = require('../services/paintService');
const router = express.Router();

router.post('/add-paint', async (req, res) => {
    const fileName = req.body['fileName'];
    const isPublic = req.body['isPublic'];
    const allowedUsers = req.body['allowedUsers'];
    const imageUrl = req.body['imageUrl'];

    const result = await paintService.addPaint(fileName, isPublic, allowedUsers, imageUrl, req.session.username);
    
    if(result) {
        res.send('Ok');
    }
    else {
        res.sendStatus(400);
    }
});

module.exports = router;