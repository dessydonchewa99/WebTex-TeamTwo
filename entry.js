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

app.use(require('./controllers/paintController'));
app.use(require('./controllers/usersController'));


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


app.get('/', (req, res) => {
    if(!req.session.loggedin) {
        res.redirect('/login');
        return;
    }
    res.render('index', {username: req.session.username});
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


app.get('/:id', (req, res) => {
     Paint.findOne({'id':req.params.id}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            //console.log(result)
            res.json(result);
        }
    });
});
