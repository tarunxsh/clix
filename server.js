// activate env vars
const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const db = require('./db.js');

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
const api = require('./api/index');


//setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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