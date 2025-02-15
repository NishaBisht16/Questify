const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answerText: { type: String },
    isActive: { type: Boolean, default: true },
    createdBy: {},
    modifyBy: {},
    createdAt: {},
    modifyAt: {}

},
)

const Answers = mongoose.model("Answers", AnswerSchema)

module.exports = Answers;
