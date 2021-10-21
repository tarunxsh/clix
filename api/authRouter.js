const express = require('express');
const router = express.Router();
const passport = require('passport');
const {validPassword, genPassword, issueJWT} = require('../utils/password');
const User = require('../models/user');


router.post('/login', function(req, res, next){
    User.findOne({where : { username: req.body.username }})
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }

            const isValid = validPassword(req.body.password, user.password, user.salt);
            
            if (isValid) {
                const tokenObject = issueJWT(user);
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
            }

        })
        .catch((err) => {
            next(err);
        });
});


router.post('/register', (req, res, next) => {
    const {salt, hash} = genPassword(req.body.password);

    const newUser = User.create({
        username: req.body.username,
        password: hash,
        salt : salt
    });

    newUser.then((user) => {
        console.log(user);
        res.json({ success: true, user: user });
    })
    .catch((err)=>{
        res.json({ success: false, msg: err });
    });
 });


 // Auth Demo Routes
router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/api/auth/register">register</a></p><br>\
    <p>Have an account ?  <a href="/auth/login">Login</a></p>');
});


router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/api/auth/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});


router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="/api/auth/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});


// curl -H "Authorization: Bearer jwttoken" http://localhost:8000/auth/protected
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

module.exports = router;
