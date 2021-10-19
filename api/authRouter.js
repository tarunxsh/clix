const express = require('express');
const router = express.Router();
const passport = require('passport');
const genPassword = require('../utils/password').genPassword;
const User = require('../models/user');
const isAuth = require('../middlewares/authMiddleware').isAuth;
const isAdmin = require('../middlewares/authMiddleware').isAdmin;

const loginRedirects = {
    failureRedirect: '/auth/login-failure',
    successRedirect: '/auth/login-success'
};

/* GET users listing. */
router.post('/login',  passport.authenticate('local', loginRedirects));

router.post('/register', (req, res, next) => {
    const {salt, hash} = genPassword(req.body.pw);

    const newUser = User.create({
        username: req.body.uname,
        password: hash,
        salt : salt
    });

    newUser.then((user) => {
        console.log(user);
    });

    res.redirect('/auth/login');
 });


router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/auth/register">register</a></p><br>\
    <p>Have an account ?  <a href="/auth/login">Login</a></p>');
});

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/auth/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="/auth/register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});


router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/auth/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/auth/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;
