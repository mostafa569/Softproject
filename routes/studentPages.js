const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const log=require('../config/auth');
var isStudent =log.isStudent;



router.get('/:id',isStudent,(req, res) => {
     
    res.sendStatus(200);

});

module.exports =router;