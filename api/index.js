const express = require('express');
const router = express.Router();
const frames_api = require('./frames_api');


router.get('/', (req,res) => res.json('Express Node Server'));
router.get('/api', (req, res) => res.json('Express API'));


//API Endpoints : using nested Routing
router.use('/api/frames', frames_api);
// router.use('/api/users', users_api);        todo


module.exports = router;