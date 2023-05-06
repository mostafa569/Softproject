const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


router.post("/admin", passport.authenticate('admin', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
 
    res.redirect('/admin-area/'+ req?.user?._id);
  
});

router.post("/student",  passport.authenticate('student', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
  
    res.redirect('/students/'+ req?.user?._id);
  
});


router.post("/doctor", passport.authenticate('doctor', {
  failureRedirect: '/login',
  failureFlash: true
}), function (req, res) {
 
    res.redirect('/doctors/'+ req?.user?._id);
  
});





module.exports = router;
