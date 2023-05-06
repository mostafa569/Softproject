const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const log=require('../config/auth');
var isDoctor =log.isDoctor;


router.get('/:id',isDoctor,(req, res) => {
     
    res.sendStatus(200);

});


module.exports= router;