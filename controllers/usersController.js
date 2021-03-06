const express = require('express');
const usersService = require('../services/usersService');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const regexUsername = /[a-zA-Z0-9._]{3,30}/ // letters and numbers
const regexPassword = /[a-zA-Z0-9._]{5,30}/ // letters and numbers
const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // valid email

router.get('/login', async (req, res) => {
    if(req.session.loggedin) {
        res.redirect('/');
        return;
    }
    res.render('login');
    return;
});

router.post('/login', async (req, res) => {

    const username = req.body["username"];
    const password = req.body["password"];

    const result = await usersService.checkUserCredentials(username, password);

    if (result) {
        req.session.loggedin = true;
        req.session.username = username;

        res.sendStatus(200);
        return;
    }
    else {
        res.sendStatus(401);
    }

});

router.get('/register', async (req, res) => {
    if(req.session.loggedin) {
        res.redirect('/');
        return;
    }

    res.render('register', {errorMessage: null});
});

router.post('/register', async (req, res) => {

    const validUsername = regexUsername.test(req.body["username"]);
    const validPassword = regexPassword.test(req.body["password"]);
    const validEmail = regexEmail.test(req.body["email"]);

    if(req.body["password"] != req.body["confirmPassword"]) {
        res.status(401).send("Passwords should match!");
        return;
    }
    if (!validPassword){
        res.status(401).send("Invalid password! Password should be at least 6 characters containing only upper/lowercase letters");
        return;
    }
    if (!validUsername){
        res.status(401).send("Invalid username! Username should be at least 6 characters containing only upper/lowercase letters");
        return;
    }
    if (!validEmail){
        res.status(401).send("Invalid email!");
        return;
    }
    const result = await usersService.createUser(req.body["username"], req.body["email"], req.body["password"]);
    
    if (result) {
        res.sendStatus(200);
    } else {
        res.status(401).send("Username already exist.");
    }
    
});

router.get('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userId = null;
    res.redirect('/login');
});

router.get('/changepassword', (req, res) => {

    res.render('changepassword', {errorMessage: null});
});


router.post('/changepassword', upload.single(), async (req, res) => {

    const validPassword = regexPassword.test(req.body["password"]);

    if(req.body["password"] != req.body["confirmPassword"]) {
        res.render('changepassword', {errorMessage: "Passwords should match!"});
        return;
    }

    if (!validPassword){
        res.render('changepassword', {errorMessage: "Invalid password! Password should be at least 6 characters containing only upper/lowercase letters"});
        return;
    }
    
    const validation = await usersService.checkUserCredentials(req.body["username"], req.body["oldPassword"]);
    if(!validation) {
        res.render('changepassword', {errorMessage: "Invalid username or old password!"});
        return;
    }

    const result = await usersService.updateUserPassword(req.body["username"], req.body["password"]);

    if (result) {
        res.redirect('/');
        return;
    }
    else {
        res.render('changepassword', {errorMessage: null});
        return;
    }
});


router.get("/users", async (req, res) => {
    var users = await usersService.getUsers();
    users = users.filter(x => x.username != req.session.username);
    
    res.send(users);
});
module.exports = router;