const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const validPassword = require('../utils/password').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ where: { username: username } })
        .then((user) => {
            console.log(user);
            if (!user) { return done(null, false) }
            
            const isValid = validPassword(password, user.password, user.salt);
            
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

// serializeUser determines which data of the user object should be stored in the session. 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findByPk(userId)   //findByPk in sequelize
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});