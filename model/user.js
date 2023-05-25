const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;