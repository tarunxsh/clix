const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.findAll()
    .then((users)=>res.json(users))
    .catch((err)=>res.json(err));
}

exports.getUserById = (req, res) => {
    let id = req.params.id;
    User.findByPk(id)
    .then((user)=>res.json(user))
    .catch((err)=>res.json(err));
}