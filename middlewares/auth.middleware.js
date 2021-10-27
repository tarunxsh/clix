const passport = require('passport');

module.exports.isAuth = passport.authenticate('jwt', { session: false });

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource because you are not an admin.' });
    }
}

module.exports.isOwner = (req, res, next) => {
    next();
    // Todo
    // console.log(req.user);
    // if (req.user.id === req.params.id) {
    //     next();
    // } else {
    //     res.status(403).json({ msg: 'You are not authorized to view this resource because you are not an owner.' });
    // }
}