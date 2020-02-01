const ppt = require('passport-jwt');
const db = require('../database/mysql-helper.js');

var JwtStrategy = ppt.Strategy;

var jwtStrategy = (passport) => {
    const opts = {
        jwtFromRequest: extractJWTFromCookie,
        secretOrKey: process.env.JWT_SECRET
    };
    passport.use(new JwtStrategy(opts, (payload, done) => {
        if(!payload.username){
            return done(null, false);
        }
        else{
            
        }

        if(typeof payload.email !== 'undefined'){
            db.findUserByEmail(payload.email)
            .then((user) => {
                if(user){
                    user.level = payload.level;
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            }).catch((err) => {
                return done(err,false);
            });
        }
        else{
            return done('No email', false);
        }
    }));
}

var extractJWTFromCookie = function (req){
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
}

module.exports = jwtStrategy;