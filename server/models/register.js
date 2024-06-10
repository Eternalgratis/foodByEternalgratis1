const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, required: true }
},
{
    timestamps: true
}
)

const RegisterModel = mongoose.model('register', registerSchema)

module.exports = RegisterModel;