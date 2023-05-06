const mongoose = require("mongoose");



const StudentcounterSchema = new mongoose.Schema({
    id:  {
        type: String
    },
    Seq:  {
        type: Number
    }

});


const Studentcounter = mongoose.model("studentcounter", StudentcounterSchema);

module.exports = Studentcounter;