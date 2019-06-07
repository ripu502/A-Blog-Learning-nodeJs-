const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const keys = require('./config/keys');

const helmet = require('helmet');
const compression = require('compression');

const port = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(compression());

const router = require('./routes/router');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(router);

mongoose.connect(`mongodb+srv://${process.env.MongoUser}:${process.env.MongoPassword}@cluster0-jywn3.mongodb.net/${process.env.MongoDataBase}?retryWrites=true`, { useNewUrlParser: true }).then((result) => {
    console.log('connected');
    app.listen(port);
}).catch((err) => {
    console.log(err);
});