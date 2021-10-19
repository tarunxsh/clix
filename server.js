// activate env vars
const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./db.js');
const api = require('./api/index');

// check db connection
db.authenticate()
.then(() => {
console.log('database Connected');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});


const app = express();
const port = process.env.PORT || 3000;


//setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session setup
// by default session is stored in memory 
// default session name : 'connect.sid'.
// access session : req.session
app.use(session({
  secret: process.env.SECRET, // used to validate session
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
  }
}));

// passport setup
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/media', express.static('uploads')); // uploaded files are now available under /media url
app.use('/', api);


// if requested url is not from above show error
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error});
});


// sync db and start listening on given port
db.sync().then(() => {
    app.listen(port, ()=>console.log(`server starts listening on ${port}`));
});