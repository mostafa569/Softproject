exports.isStudent =function (req, res, next){
    if(req.user){
       var  code = req?.user?.username.substring(0, 3);
     
       if (code==300){
        next();
       }else{
      //  req.flash('danger', 'access not allowed');
        res.redirect('/login');
       }
        
    }else{
      //  req.flash('danger', 'you must log in first');
        res.redirect('/login');
    }
};

exports.isAdmin =function (req, res, next){
    
    if(req.user){
        
        var  code = req?.user?.username.substring(0, 3);
       
       if (code==100){
        next();
       }else{
       // req.flash('danger', 'access not allowed');
        res.redirect('/login');
       }
        
    }else{
       // req.flash('danger', 'you must log in first');
        res.redirect('/login');
    }

    
};

exports.isDoctor =function (req, res, next){
    if(req.user){
       var  code = req?.user?.username.substring(0, 3);
       if (code==200){
        next();
       }else{
       // req.flash('danger', 'access not allowed');
        res.redirect('/login');
       }
        
    }else{
      //  req.flash('danger', 'you must log in first');
        res.redirect('/login');
    }
};