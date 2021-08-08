const mongoose = require("mongoose");

const PostSchame = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchame);