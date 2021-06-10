const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = 8081;

app.set('view engine', 'ejs');

app.use(express.json({
    limit: "50mb"
}));


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

app.use(function (req, res) {
    res.status(404).render('page404');
});
