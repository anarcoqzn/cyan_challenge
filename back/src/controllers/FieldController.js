const Field = require('../models/Field');


module.exports = {
    async register(req, res, next, io){
        
        const {farmCode, code} = req.body;
        const point = {type:'Point', coordinates:req.body.coordinates}

        if(await Field.findByPk(code)) return res.json({ error: "Field already exists" })

        const field = await Field.create({"code":code,"coordinates":point, "farmCode":farmCode});
        
        io.emit('entity-created', {message:`Field created: ${code}` })
        return res.json(field);
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