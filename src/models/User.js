const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    permission: {
        type: Number, 
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: null,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
