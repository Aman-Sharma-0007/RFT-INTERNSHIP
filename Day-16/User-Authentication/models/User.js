const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: 'Please enter a valid email!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password must be at least 4 characters']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);