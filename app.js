const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    res.send('Hello from blog');
});

app.listen(3000);