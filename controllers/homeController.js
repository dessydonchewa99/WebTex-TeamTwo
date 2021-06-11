const express = require('express');
const paintService = require('../services/paintService');

const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    res.render('index', {username: req.session.username});
});

router.get('/edit-paint', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    res.render('index', {username: req.session.username});
    
});

router.get('/mygallery', async (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    const result = await paintService.getPaintsByUser(req.session.username, 'id');

    if(result == null) {
        res.render('mygallery', {images: []});
        return;
    }

    res.render('mygallery', {images: result});

});

router.get('/public_gallery', async (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    const result = await paintService.getAllowedPaintsByUser(req.session.username, 'id');

    if(result == null) {
        res.render('mygallery', {images: []});
        return;
    }

    res.render('mygallery', {images: result});

});

// router.get('/usergallery', async (req, res) => {
//     if(!req.session.loggedin) {
//         res.redirect('/login');
//         return;
//     }
    
//     const result = await paintService.getAllowedPaintsByUser(req.query.username, req.session.username);

//     if(result == null) {
//         res.render('mygallery');
//         return;
//     }

//     res.render('mygallery', {images: result});

// });


module.exports = router;