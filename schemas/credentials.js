const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    profileimg: {
        type: String,
    },
    fullname: {
        type: String,
        required: [true, 'please Enter your fullname'],
        minLength: 3,
    },
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, "please enter your username"],
    },
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Input A valid Email");
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 20,
    },
    postids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.plugin(plm);
const credentials = new mongoose.model('Credential', userSchema);

module.exports = credentials;
