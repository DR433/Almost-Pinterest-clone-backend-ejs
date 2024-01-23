const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Credential'
    },
    postcaption: {
        type: String,
        required: [true, "Please enter a caption of the post"]
    },
    postdescription: {
        type: String,
    },
    tags: {
        type: Array,
        default: [],
        required: [true, 'please enter tags for this picture']
    },
    postimg: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
})

const posts = new mongoose.model('Post', postschema);
module.exports = posts;