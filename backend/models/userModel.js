const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    FirstName: { type: String, require: true },
    LastName: { type: String, require: true },
    MobileNumber: { type: Number, require: true },
    Email: { type: String, require: true, unique: true },
    Password: { type: String, require: true },
})

 const userDetails = mongoose.model('userDetails', userSchema);

 module.exports = userDetails;