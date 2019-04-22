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
        required: true,
        // unique: true,
        // lowercase: true,
    }

});

module.exports = mongoose.model('Post', postSchema);
