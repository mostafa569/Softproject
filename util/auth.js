const bcrypt = require('bcrypt');

module.exports = userValidation =  function (user,password,done){
    if(!user){
        return done(null,false, {message:'user not registerd in the system'});
    }
    
    //    bcrypt.compare(password,user.password,(err,isMatch)=>{
    //     if(err)
    //         console.log(err);
     
        if(password==user.password){
            
            return done(null,user);
        }else{
            
            return done(null,false, {message: 'please enter a valid password'})
        }
//    });
}