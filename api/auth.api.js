const express = require('express');
const router = express.Router();
const passport = require('passport');
const {register, login, logout} = require('../controllers/auth.controller');


router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

 // Auth Demo Routes
router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/api/auth/register">register</a></p><br>\
    <p>Have an account ?  <a href="/api/auth/login">Login</a></p>');
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
