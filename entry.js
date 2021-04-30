const express = require('express');
const mongoose = require('mongoose');
const Paint = require('./models/paints');
const User = require('./models/users');
const multer = require('multer');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.json({
    limit: "50mb"
}));


const upload = multer();

const dbUrl = 'mongodb+srv://admin:2BL2kSe8DJNNI52u@cluster0.f5ven.mongodb.net/cloudpaintdb?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(8081))
    .catch((err) => console.log(err));


app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post('/add-paint', (req, res) => {
    const paint = new Paint({
        title: req.body["fileName"],
    })

    paint.content = {
        data: req.body["imageUrl"],
        contentType: "image/png"
    };

    paint.save()
        .then((result) => {
            res.send('Ok');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/show-paint/:title', (req, res) => {
    Paint.findOne({'title': req.params.title}, 'title content', function(err, image) {
        if(image == null) {
            res.redirect('/');
            return;
        }
        var base64Data = image.content.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        var img = Buffer.from(base64Data, 'base64');

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    });
})

app.get('/login', (req, res) => {
    res.sendFile('./views/login.html',  {root: __dirname});
});

app.get('/', (req, res) => {
    res.render('index', {username: req.session.username});
});

app.get('/register', (req, res) => {
    res.sendFile('./views/register.html',  {root: __dirname});
});

app.post('/register', upload.single(), (req, res) => {
    const formData = req.body;
    var user = new User({
        username: req.body["username"],
        password: req.body["password"]
    });
    
    User.findOne({username: user.username}, 'username', function(err, dbUser) {
        
        if(dbUser == null) {
            user.save()
                .then((result) => {
                    res.render('index');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

app.post('/login', upload.single(), (req, res) => {
    User.findOne({username: req.body["username"], password: req.body["password"]}, 'username', function(err, dbUser) {
        if (dbUser != null) {
            req.session.loggedin = true;
            req.session.username = dbUser.username;
            res.redirect('/');
        }
    });
});