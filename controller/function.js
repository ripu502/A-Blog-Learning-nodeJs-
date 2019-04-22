const Post = require('../models/Post');

module.exports.addPost = (req, res, next) => {
    res.render('addPost', {
        title: "Add new Post"
    });
};

module.exports.home = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.render('home', {
                title: "Home",
                details: posts
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports.error = (req, res, next) => {
    res.render('error', {
        title: "Error"
    });
}

module.exports.postingPost = (req, res, next) => {
    const name = req.body.name;
    const heading = req.body.heading;
    const postContent = req.body.postContent;
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

module.exports.delete = (req, res, next) => {
    const deleteId = req.params.deleteId;
    Post.findByIdAndDelete(deleteId)
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports.update = (req, res, next) => {
    const updateId = req.params.updateId;
    Post.findById(updateId)
        .then(post => {
            res.render('update', {
                title: "Update",
                name: post.name,
                heading: post.heading,
                postContent: post.postContent,
                updateId: post._id
            });
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports.postUpdate = (req, res, next) => {
    // res.send(req.body);
    Post.findById(req.body.updateId)
        .then(post => {
            post.name = req.body.name;
            post.heading = req.body.heading;
            post.postContent = req.body.postContent;
            post.save().then((done)=>{
                res.redirect('/');  
            });       
        })
        .catch(err => {
            console.log(err);
        });
}