const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

const router = require('./routes/router');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(router);

mongoose.connect(keys.mongoURI,  { useNewUrlParser: true }).then((result)=>{
    console.log('connected');
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
});