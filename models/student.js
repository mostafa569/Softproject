const mongoose = require("mongoose");



const studentSchema = new mongoose.Schema({
    password:  {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    username:  {
        type: String,
        unique: true,
        required: true
    },
    nationalid:  {
        type: Number,
        unique: true,
        required: true
    },
    academicnumber:  {
        type: Number,
        unique: true,
        required: true
    },
    courses: [String],
    level:  {
        type: Number,
        enum : [1,2,3,4],
        required: true
    },
    department:{
        type:String,
        required:true
    }

});



const Student = mongoose.model("students", studentSchema);

module.exports = Student;