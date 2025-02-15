const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String },
    isActive: { type: Boolean, default: true },
    createdBy: {},
    modifyBy: {},
    createdAt: {},
    modifyAt: {}
})

const questions = mongoose.model("questions", questionSchema)

module.exports = questions;
