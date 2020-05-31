const router = require('express').Router();
const controller = require('../controller/function');
const { forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

router.get('/addPost', ensureAuthenticated, controller.addPost);

router.get('/logout', controller.logout);

router.get('/signup', forwardAuthenticated, controller.signup);

router.post('/register', forwardAuthenticated, controller.register);

router.post('/login', forwardAuthenticated, controller.postLogin);

router.get('/login', forwardAuthenticated, controller.login);

router.post('/postingPost', ensureAuthenticated, controller.postingPost);

router.get('/', ensureAuthenticated, controller.home);

router.get('/delete:deleteId', ensureAuthenticated, controller.delete);

router.get('/update:updateId', ensureAuthenticated, controller.update);

router.post('/updatingPost', ensureAuthenticated, controller.postUpdate);

router.get('/MyPost', ensureAuthenticated, controller.myposts)

router.use('/', controller.error);

module.exports = router;