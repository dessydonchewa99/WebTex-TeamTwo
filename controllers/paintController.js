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

router.get('/get-paint', async (req, res) => {
    const paint = await paintService.getPaintById(req.query.id);

    if (paint) {
        res.json(paint);
    } else {
        res.sendStatus(404);
    }
    
});


router.delete('/delete-paint/:id', async (request, response) => {
    
    const isDeleted = await paintService.deletePaintById(request.params.id);

    if (isDeleted) {
        response.sendStatus(200);
        return;
    }

    response.sendStatus(400);
    
});
module.exports = router;