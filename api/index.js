const express = require('express');
const router = express.Router();
const frames_api = require('./frame.api');
const auth_api = require('./auth.api');

router.get('/', (req, res) => res.json('Express API'));

//API Endpoints : using nested Routing
router.use('/frames', frames_api);
// router.use('/users', users_api);        todo

// server side rendering for demo
router.use('/auth', auth_api);


module.exports = router;