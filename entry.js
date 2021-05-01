const express = require('express');
const mongoose = require('mongoose');
const Paint = require('./models/paints');

const app = express();
const dbUrl = 'mongodb+srv://admin:2BL2kSe8DJNNI52u@cluster0.f5ven.mongodb.net/cloudpaintdb?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(8081))
    .catch((err) => console.log(err));


app.use(express.static(__dirname + '/public'));

app.get('/add-paint', (req, res) => {
    const paint = new Paint({
        title: 'Test Paint'
    });

    paint.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/login', (req, res) => {
    res.sendFile('./views/login.html',  {root: __dirname});
});

app.get('/', (req, res) => {
    res.sendFile('./views/index.html',  {root: __dirname});
});

app.get('/register', (req, res) => {
    res.sendFile('./views/register.html',  {root: __dirname});
});

app.get('/gallery', (req, res) => {
    res.sendFile('./views/gallery.html',  {root: __dirname});
});