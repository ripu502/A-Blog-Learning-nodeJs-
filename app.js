const express = require('express');

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/', (req, res, next) => {
    res.render('home');
});

app.listen(3000);