const {validPassword, genPassword, issueJWT} = require('../utils/password');
const User = require('../models/user');


exports.register = (req, res) => {
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
};

exports.login = (req, res) => {
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
};

exports.logout = (req, res) => {
    // to be done on frontend side
    // just remove token from local storage
};