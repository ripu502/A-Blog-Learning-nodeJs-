const Post = require('../models/Post');

module.exports.addPost = (req, res, next) => {
    res.render('addPost');
};

module.exports.home = (req, res, next) => {
    res.render('home');
}


module.exports.error = (req, res, next) => {
    res.render('error');
}

module.exports.postingPost = (req, res, next) => {
    const name = req.body.name;
    const heading = req.body.heading;
    const postContent = req.body.post;
    const post = new Post({
        name: name,
        heading: heading,
        postContent: postContent
    });
    post.save()
        .then(post => {
            console.log('Post added');
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });

}