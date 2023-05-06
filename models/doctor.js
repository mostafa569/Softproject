const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
   
    username: {
        type: String,
        unique: true,
        required: true
    },
    password:  {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    department:  {
        type: String,
        required: true
    },
    docID:  {
        type:  Number
    },
    nationalid:  {
        type: Number,
        unique: true,
        required: true
    },
    courses: [String]
});




//create model
const Doctor = mongoose.model("doctors", doctorSchema);

module.exports = Doctor;