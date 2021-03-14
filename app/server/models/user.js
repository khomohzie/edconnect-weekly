const mongoose = require('mongoose')
const crypto = require('crypto')

const UserSchema = mongoose.Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    matricNumber: {
        type: String,
        required: true
    },
    program: {
        type: String
    },
    graduationYear: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.methods.setPassword = async function(enteredPassword) {
    if(enteredPassword.length >= 7) {
        this.salt = crypto.randomBytes(16).toString('hex')
        this.password = crypto.pbkdf2Sync(enteredPassword, this.salt, 1000, 64, 'sha512').toString('hex')
    }
    else {
        throw new Error('Password should have at least 7 characters')
    }
}

UserSchema.methods.validPassword = async function(enteredPassword) {
    return this.password === crypto.pbkdf2Sync(enteredPassword, this.salt, 1000, 64, 'sha512').toString('hex')
}

const User = mongoose.model('User', UserSchema)

module.exports = User