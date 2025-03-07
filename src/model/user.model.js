const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')||!this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
//method to compare the hashed password
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('User', UserSchema);