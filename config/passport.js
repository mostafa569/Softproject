const localStrategy = require('passport-local').Strategy;
const Admin=require('../models/admin');
const Doctor=require('../models/doctor');
const Student=require('../models/student');
const isValid = require('../util/auth');


var code;
var Table;

module.exports = (passport) =>{
    passport.use("admin",new localStrategy({},(username, password, done)=>{
        Admin.findOne({ username}).then(user=>{
            isValid(user,password,done);
        }).catch(err=>{
         if(err)
             console.log(err);
         
        });
    }));
    passport.use("doctor",new localStrategy({},(username, password, done)=>{
        Doctor.findOne({ username}).then(user=>{
            isValid(user,password,done);
        }).catch(err=>{
         f(err)
             console.log(err);
         
        });
    }));
    passport.use("student",new localStrategy({},(username, password, done)=>{
        Student.findOne({ username}).then(user=>{
            isValid(user,password,done);
        }).catch(err=>{
         if(err)
             console.log(err);
         
        });   
    }));

    passport.serializeUser((user,done)=>{
        done(null, user.username);
    });

    passport.deserializeUser(async(username,done)=>{
        code = username.substring(0, 3);
        switch(code){
         case '100':
             Table=Admin;
             break;
         case '200':
             Table=Doctor;
             break;
         case '300':
             Table=Student;
             break;    
        }
        await Table.findOne({username}).then(user=>{
         
             done(null, user);
         
          }).catch(err=>{
             if(err)
             console.log(err);
          });
    });


   
}