const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 5000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((req, res,  next) => {
//     res.render('maintenance.hbs')
// });
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome to my new Website!!!',
        welcomeMessage: 'This is my website and have some fun!!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        aboutMessage: 'I am Node.Js developer currently learning and developing new things'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Node Server Project',
        message: 'This a node server project that is live now!!!'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to load the page!"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});