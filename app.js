const express = require('express');

const app = express();

const router = require('./routes/router');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(router);

app.listen(3000);