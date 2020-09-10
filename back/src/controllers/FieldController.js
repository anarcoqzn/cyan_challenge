const Field = require('../models/Field');
const { findById } = require('./MillController');

module.exports = {
    async register(req, res){
        
        const {farmCode, code} = req.body;
        const point = {type:'Point', coordinates:req.body.coordinates}

        if(await Field.findByPk(code)) return res.status(400).send("Field already exists")

        const field = await Field.create({"code":code,"coordinates":point, "farmCode":farmCode});

        return res.json(field).send("New field created: "+field.code);
    },

    async show(req, res){
        return res.json(await Field.findAll({include:{association:'farm'}}));
    },

    async findById(req,res){
        const{id} = req.params;

        const field = await Field.findByPk(id);

        if(!field) return res.status(404).send("Field not found!");

        return res.json(field);
    }
}