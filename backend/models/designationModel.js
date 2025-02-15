const mongoose = require('mongoose');

const desigSchema = new mongoose.Schema({
    designationName: { type: String }

})

const designation = mongoose.model("designation", desigSchema)

module.exports = designation;
