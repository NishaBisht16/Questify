const mongoose = require('mongoose');

const QuesAnsSchema = new mongoose.Schema({
    quesId: {},
    ansId: {},
    isActive: { type: Boolean },
    createdBy: {},
    modifyBy: {},
    createdAt: { type: Date, default: Date.now() },
    modifyAt: {}

})

const QuestionsAnswers = mongoose.model("QuestionsAnswers", QuesAnsSchema)

module.exports = QuestionsAnswers;
