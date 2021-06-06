const express = require('express');
const mongoose = require('mongoose');
const Paint = require('./models/paints');
const User = require('./models/users');
const multer = require('multer');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const port = 8081;

app.set('view engine', 'ejs');

app.use(express.json({
    limit: "50mb"
}));


const upload = multer();
const dbUrl = 'mongodb+srv://admin:2BL2kSe8DJNNI52u@cluster0.f5ven.mongodb.net/cloudpaintdb?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(port);
        console.log("Application listen on https://localhost:" + port);
    })
    .catch((err) => console.log(err));


app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
    cookie: {
        maxAge: 604800000 // ExpiresAt: 7 days
    }
}));

app.use(require('./controllers/homeController'));
app.use(require('./controllers/paintController'));
app.use(require('./controllers/usersController'));


app.get('/gallery', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    Paint.find({$or: [{'isPublic': true}, {'allowedUsers': req.session.username}]}, 'id title content createdBy', function(err, result) {
        if(result == null) {
            res.render('mygallery');
            return;
        }

        res.render('mygallery', {images: result});
    });
});

app.get('/mygallery', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    Paint.find({'createdBy': req.session.username}, 'id title content createdBy', function(err, result) {
        if(result == null) {
            res.render('mygallery');
            return;
        }

        res.render('mygallery', {images: result});
    });
});

app.get("/users", function(req, res, next) {
	try {
        const users = User.find({}, {username: 1}, function (err, result) {
            if(result == null) {
                return;
            }
            res.send(result);
        });
        
	} catch(err) {
		next(err);
	}
});

app.get('/usergallery', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    //createdBy: req.query.username, allowedUsers: {"$in": [req.session.username]}
    Paint.find(
        {
            $and: [
                {createdBy: req.query.username},
                { $or: [
                    {isPublic: true},
                    {allowedUsers: {$in: [req.session.username]}}
                ]}
            ]
        }, 
        'id title content createdBy isPublic allowedUsers', function(err, result) {
        if(result == null) {
            res.render('mygallery');
            return;
        }

        res.render('mygallery', {images: result});
    });
});

