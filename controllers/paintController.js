const express = require('express');
const paintService = require('../services/paintService');
const router = express.Router();

router.post('/add-paint', async (req, res) => {
    const fileName = req.body['fileName'];
    const isPublic = req.body['isPublic'];
    const allowedUsers = req.body['allowedUsers'];
    const imageUrl = req.body['imageUrl'];

    const result = await paintService.addPaint(fileName, isPublic, allowedUsers, imageUrl, req.session.username);
    
    if(result.isSuccessful) {
        res.send('Ok');
    }
    else {
        res.status(400).send(result.errorMessage);
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

router.get('/show-paint/:id', async (req, res) => {
    const result = await paintService.getPaintById(req.params.id);
    
    if(result == null) {
        res.redirect('/');
        return;
    }

    var base64Data = result.content.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    var img = Buffer.from(base64Data, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
});
module.exports = router;