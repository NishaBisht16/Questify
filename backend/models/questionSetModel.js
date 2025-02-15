const mongoose = require('mongoose');

const QuestionSetsSchema = new mongoose.Schema({
    QuestiAnswerId: {},
    setId: { type: mongoose.Schema.Types.ObjectId, },
    desId: { type: mongoose.Schema.Types.ObjectId, },
    createdBy: {},
    modifyBy: {},
    createdAt: { type: Date, default: Date.now() },
    modifyAt: {}
})

const QuestionSets = mongoose.model("QuestionSets", QuestionSetsSchema)

module.exports =QuestionSets;
