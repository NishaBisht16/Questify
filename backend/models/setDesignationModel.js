const mongoose = require('mongoose');

const setandDesiSchema = new mongoose.Schema({

    setId: { type: mongoose.Schema.Types.ObjectId, required: true },
    desId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

 const SetDesignation = mongoose.model("SetDesignation", setandDesiSchema);

module.exports = SetDesignation;
