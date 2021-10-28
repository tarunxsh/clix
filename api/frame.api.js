const express = require('express');
const router = express.Router();
const {isAuth, isOwner} = require('../middlewares/auth.middleware');
const FrameController = require('../controllers/frame.controller');
const upload = require('../middlewares/upload');


router.get('/', FrameController.getAllFrames);
router.get('/:id', FrameController.getFrameByID);
router.post('/', isAuth, upload.single('img'), FrameController.createNewFrame);
router.put('/:id', isAuth, isOwner, upload.single('img'), FrameController.updateFrame);
router.delete('/:id', isAuth, isOwner, FrameController.deleteFrame);

module.exports = router;


// curl -F "descp=wallpaper" -F "likes=10" -F "downloads=15" -F "img=@filepath" -X POST http://localhost:8000/api/frames
// curl -X "DELETE" http://localhost:8000/api/frames/3