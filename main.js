
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded());

let comments = [];

app.post('/add-comment', (req, res) => {
    comments.push(req.body.comment);
    res.redirect('/');
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(3000);
