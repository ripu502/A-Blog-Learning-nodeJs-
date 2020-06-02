const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
        // lowercase: true,
    },
    heading: {
        type: String,
        required: true,
        // unique: true,
        // lowercase: true,
    },
    postContent: {
        type: String,
        // required: true,
        // unique: true,
        // lowercase: true,
    },
    publisherEmail: {
        type: String,
    },
    readmore: {
        type: String,
    }

});

module.exports = mongoose.model('Post', postSchema);
