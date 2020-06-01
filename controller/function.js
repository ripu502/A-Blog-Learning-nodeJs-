const Post = require('../models/Post');
const Register = require('../models/Register');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const maxItem = 2;
let totalItem;

module.exports.addPost = (req, res, next) => {
    res.render('addPost', {
        title: "Add new Post",
        login: req.user,
    });
};

module.exports.signup = (req, res, next) => {
    res.render('signup', {
        title: "Register Yourself",
        login: req.user,

    });
};

module.exports.login = (req, res, next) => {
    res.render('login', {
        title: "Login Here",
        login: req.user,
    });
};

module.exports.myposts = (req, res, next) => {
    const page = +req.query.page || 1;
    console.log(`signed user is ${req.user.email} from myposts`);
    Post.find({ publisherEmail: req.user.email }).countDocuments().then(result => {
        totalItem = result;
        return Post.find({ publisherEmail: req.user.email }).skip((page - 1) * maxItem).limit(maxItem);
    }).then(posts => {
        // console.log(items);
        res.render('mypost',
            {
                title: 'My Posts',
                details: posts,
                currentPage: page,
                hasNextPage: totalItem > page * maxItem,
                hasPreviousPage: page > 1,
                previous: page - 1,
                next: page + 1,
                lastPage: Math.ceil(totalItem / maxItem),
                login: req.user,
            }
        );
    })
        .catch(err => {
            Console.log('error in the getting item getItem');
        });


    // Post.find()
    //     .then((posts) => {
    //         res.render('home', {
    //             title: "Home",
    //             details: posts
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

}

module.exports.register = (req, res, next) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 12)
        .then((hashPassword) => {
            const user = new Register({ password: hashPassword, email: email, name: name });
            return user.save();
        }).then(() => {
            console.log('user is saved');
            res.redirect('/login');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/signup');
        });
}

module.exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
}

module.exports.home = (req, res, next) => {
    const page = +req.query.page || 1;

    Post.find().countDocuments().then(result => {
        totalItem = result;
        return Post.find().skip((page - 1) * maxItem).limit(maxItem);
    }).then(posts => {
        // console.log(items);
        res.render('home',
            {
                title: 'Home',
                details: posts,
                currentPage: page,
                hasNextPage: totalItem > page * maxItem,
                hasPreviousPage: page > 1,
                previous: page - 1,
                next: page + 1,
                lastPage: Math.ceil(totalItem / maxItem),
                login: req.user,
            }
        );
    })
        .catch(err => {
            Console.log('error in the getting item getItem');
        });


    // Post.find()
    //     .then((posts) => {
    //         res.render('home', {
    //             title: "Home",
    //             details: posts
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
}


module.exports.error = (req, res, next) => {
    res.render('error', {
        title: "Error",
        login: req.user,
    });
}

module.exports.postingPost = (req, res, next) => {
    const name = req.body.name;
    const heading = req.body.heading;
    const postContent = req.body.postContent;
    const publisherEmail = req.body.auther;
    let readmore = postContent.length > 300 ? 1 : 0;

    const post = new Post({
        name: name,
        heading: heading,
        postContent: postContent,
        publisherEmail: publisherEmail,
        readmore: readmore
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
    Post.findOne({ _id: deleteId }).then(post => {
        if (req.user.email != post.publisherEmail) {
          console.log('nahi');
            res.redirect('/MyPost');
        } else {
            Post.findByIdAndDelete(deleteId)
                .then(result => {
                    res.redirect('/MyPost');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/MyPost');
                });
        }
    }).catch(err => {
        console.log(err);
        res.redirect('/MyPost');
        return;
    })

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
                updateId: post._id,
                login: req.user,

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
            post.save().then((done) => {
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
}