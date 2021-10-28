const passport = require('passport');
const Frame = require('../models/frame');

module.exports.isAuth = passport.authenticate('jwt', { session: false });

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json({ msg: 'Unauthorized : you are not an admin.' });
    }
}

module.exports.isOwner = (req, res, next) => {
    frameId = req.params.id;
    Frame.findByPk(frameId)
    .then((frame)=>{
        if(!frame){
            res.status(404).json({msg:'Frame Not Found'});
        } else if(req.user.id === frame.userId){
            next();
        } else {
            res.status(403)
            .json({msg: 'Unauthorized : you are not an owner.'});
        }
    })
    .catch((err)=>res.json(err));
}