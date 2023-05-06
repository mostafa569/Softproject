const mongoose = require("mongoose");


const departmentSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    code:  {
        type: String,
        unique: true,
        required: true
    }
});

//4)create model
const Department = mongoose.model("departments", departmentSchema);

module.exports = Department;