const express = require('express');
const mongoose = require('mongoose');
const Paint = require('./models/paints');
const User = require('./models/users');
const multer = require('multer');
const session = require('express-session');
const crypto = require('crypto');
const { exception } = require('console');

const app = express();

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
	saveUninitialized: true,
    cookie: {
        maxAge: 604800000 // ExpiresAt: 7 days
    }
}));

app.post('/add-paint', (req, res) => {
    const guid = `${req.body["fileName"]}-${new Date().toISOString()}`;
    const paint = new Paint({
        id: guid,
        title: req.body["fileName"],
        isPublic: req.body['isPublic'],
        allowedUsers: req.body['allowedUsers']
    })

    paint.content = {
        data: req.body["imageUrl"],
        contentType: "image/png"
    };

    if(req.session.loggedin) {
        paint.createdBy = req.session.username;
    }

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
    if(req.session.loggedin) {
        res.redirect('/');
        return;
    }
    
    res.sendFile('./views/login.html',  {root: __dirname});
});

app.get('/', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    res.render('index', {username: req.session.username});
});

app.get('/register', (req, res) => {
    if(req.session.loggedin) {
        res.redirect('/');
        return;
    }

    res.render('register', {errorMessage: null});
});

app.get('/changepassword', (req, res) => {
    if(req.session.loggedin) {
        res.redirect('/');
        return;
    }

    res.render('changepassword', {errorMessage: null});
});

app.post('/register', upload.single(), (req, res) => {
    const formData = req.body;
    var user = new User({
        username: req.body["username"]
    });

    if(req.body["password"] != req.body["confirmPassword"]) {
        res.render('register', {errorMessage: "Passwords should match!"});
        return;
    }
    
    User.findOne({username: user.username}, 'username', function(err, dbUser) {
        
        if(dbUser == null) {

            user.password = crypto.createHash('sha256').update(req.body["password"]).digest('base64');

            user.save()
                .then((result) => {
                    
                    res.redirect('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

app.post('/changepassword', upload.single(), (req, res) => {
    console.log(2222222);
    const formData = req.body;
    var user = new User({
        username: req.body["username"]
    });
    if(req.body["password"] != req.body["confirmPassword"]) {
        res.render('changepassword', {errorMessage: "Passwords should match!"});
        return;
    }
    var newPass = crypto.createHash('sha256').update(req.body["password"]).digest('base64');
    var hashedPassword = crypto.createHash('sha256').update(req.body["oldPassword"]).digest('base64');
    User.updateOne({username: user.username, password: hashedPassword}, { $set: {password: newPass}}).exec(function(err, dbUser){
        res.redirect('/');
            return;
    });
});

app.post('/login', upload.single(), (req, res) => {

    const hashedPassword = crypto.createHash('sha256').update(req.body["password"]).digest('base64');
    User.findOne({username: req.body["username"], password: hashedPassword}, '_id username', function(err, dbUser) {
        if (dbUser != null) {
            req.session.loggedin = true;
            req.session.username = dbUser.username;
            req.session.userId = dbUser._id;
            res.redirect('/');
            return ;
        }
        else
        {
            return (dbUser);
        }

        //res.redirect('/login');
    });
    
});

app.get('/logout', (req, res) => {
    req.session.loggedin = false;
    req.session.username = null;
    req.session.userId = null;
    res.redirect('/');
});

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
        console.log(result)
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

app.delete('/mygallery/delete-paint/:id',  (request, response) => {
    console.log(request.params.id);
    Paint.findOneAndDelete({'id': request.params.id}, (err, data) => {
        if (err) {
            console.log(err);
            return response.status(500).send();
        } else {
            console.log(data);
            return response.json({data});

        }
    });
});

app.post('/logout', function(req, res) {
    console.log("I am Logout")
    req.logout();
    res.json({
        status: "logout",
        msg:"Please Log In again"
    });
    res.redirect('/login')
});

app.get('/:id', (req, res) => {
     Paint.findOne({'id':req.params.id}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result)
            res.json(result);
        }
    });
});
