const router = require('express').Router();

router.get('/addPost', (req, res, next) => {
    res.render('addPost');
});

router.get('/', (req, res, next) => {
    res.render('home');
});

router.use('/', (req, res, next) => {
    res.render('error');
});

module.exports = router;