const mongoose = require("mongoose");



const DoctorcounterSchema = new mongoose.Schema({
    id:  {
        type: String
    },
    Seq:  {
        type: Number
    }

});


const Doctorcounter = mongoose.model("doctorcounter", DoctorcounterSchema);

module.exports = Doctorcounter;