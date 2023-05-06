const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
   
    
    name:  {
        type: String,
        required: true
    },
    code:  {
        type: String,
        unique: true,
        required: true
    },
    dept:  {
        type: String,
        required: true
    },
    prerequirements: [String]
});

//4)create model
const Course = mongoose.model("courses", courseSchema);

module.exports = Course;