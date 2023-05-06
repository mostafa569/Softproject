const express = require('express');
const app=express();
const mongoose = require('mongoose');
const cookiePArser =require("cookie-parser");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport= require('passport');
const flash = require('express-flash');
const path = require('path');


app.use(cookiePArser());
app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({extended:false})); 
app.use(bodyParser.json());


// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');






var port=3000;
app.listen(port,()=>{
  console.log('listening to port'+port);
});


//connect to databse
mongoose.connect("mongodb://127.0.0.1:27017/onlineeducation",{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log("connected to database...");}).catch((err)=>{
    console.log("error connecting to database...");
});






//passport configuration
require('./config/passport')(passport);
app.use(flash());
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
  // store: Store,
  cookie: { secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());




//set routes

const studentPages = require('./routes/studentPages');
app.use('/students',studentPages);

const doctorPages = require('./routes/doctorPages');
app.use('/doctors',doctorPages);

const adminPages = require('./routes/adminPages');
app.use('/admin-area',adminPages);

const login = require('./routes/login');
app.use('/login',login);












