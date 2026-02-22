const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email_address: { type: String, require: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, enum: ['admin', 'user'], default: 'user'},
    reset_token: {type: String, default: null},
    reset_token_expiry: {type: Date, default: null}
}, { timestamps: true})

const User = mongoose?.models?.user || mongoose.model('user', UserSchema)

module.exports = User