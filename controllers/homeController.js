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

module.exports = router;