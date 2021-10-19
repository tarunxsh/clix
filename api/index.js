const express = require('express');
const router = express.Router();
const frames_api = require('./frames_api');
const authRouter = require('./authRouter');

router.get('/', (req,res) => res.json('Express Node Server'));
router.get('/api', (req, res) => res.json('Express API'));


//API Endpoints : using nested Routing
router.use('/api/frames', frames_api);
// router.use('/api/users', users_api);        todo

// server side rendering for now
router.use('/auth', authRouter);


module.exports = router;