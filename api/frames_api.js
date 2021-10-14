const express = require('express');
const router = express.Router();
const FrameController = require('../controllers/frameController');
const upload = require('../middlewares/upload');


router.get('/', FrameController.getAllFrames);
router.get('/:id', FrameController.getFrameByID);
router.post('/', upload.single('img'), FrameController.createNewFrame);
router.put('/:id', upload.single('img'), FrameController.updateFrame);

module.exports = router;


// curl -F "descp=wallpaper" -F "likes=10" -F "downloads=15" -F "img=@filepath" -X POST http://localhost:8000/api/frames