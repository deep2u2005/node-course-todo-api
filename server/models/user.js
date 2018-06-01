const mongoose = require('mongoose');

var User = mongoose.model('User', {
    Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    Age: {
        type: Number
    },
    Address: {
        type: String,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = {
    User
};
