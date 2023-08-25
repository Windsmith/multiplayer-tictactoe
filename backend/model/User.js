const mongoose = require("mongoose")

//TODO: Add matches played and create a matches schema
const UserSchema = mongoose.Schema({
    username: {
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
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    matchesWon: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("user", UserSchema)