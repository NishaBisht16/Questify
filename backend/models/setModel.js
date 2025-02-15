const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
    setName: { type: String }

})

const set = mongoose.model("set", setSchema)

module.exports=set