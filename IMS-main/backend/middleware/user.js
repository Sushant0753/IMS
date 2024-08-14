const {User} = require("../db")

function userMiddleware(req,res,next){
    const username  = req.body.username;
    const password = req.body.password;

    User.findOne({
          email  : email,
        password : password
    }).then (function(value){
        if(value){
            next();
        }else{
            res.status(401).json({
                message : "Unauthorized"
    })
}
    })
}




module.exports = userMiddleware;