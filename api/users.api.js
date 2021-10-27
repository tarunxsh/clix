const express = require('express');
const router = express.Router();
const {isAuth} = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');


router.get('/', isAuth, userController.getAllUsers);
router.get('/:id', isAuth, userController.getUserById);

module.exports = router;