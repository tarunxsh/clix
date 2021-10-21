const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

const verifyCallback = (jwt_payload, done) => {
    // console.log(jwt_payload);
    User.findOne({ where: { id: jwt_payload.sub } })
        .then((user) => {
            if (user) { return done(null, user) }
            else return done(null, false);
        })
        .catch((err) => {   
            done(err, false);
        });

}

const strategy  = new JwtStrategy(options, verifyCallback);
passport.use(strategy);