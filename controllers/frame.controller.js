const Frame = require('../models/frame.js');

const FrameController = {
    getAllFrames(req, res) {
        Frame.findAll().then((frames)=>res.json(frames));
    },

    async getFrameByID(req,res){
        let id = req.params.id;
        console.log(req.body);
        let frame = await Frame.findByPk(id);
        if(frame === null)res.status(404).send({
            message : 'Frame not found'
        });
        else res.json(frame);
    },

    async createNewFrame(req, res){
        res.send(await Frame.create({src:req.file.filename, userId:req.user.id, ...req.body}));
    },

    async updateFrame(req, res){
        let data = req.body;
        data.src = req.file.filename;

        await Frame.update(data, {
            where : {
                id:req.params.id
            }
        });
        res.status(200).send("updated");
    },

    async deleteFrame(req, res){
        await Frame.destroy({
            where : {
                id:req.params.id
            }
        });
        res.status(200).send("deleted");
    }
}


module.exports = FrameController;