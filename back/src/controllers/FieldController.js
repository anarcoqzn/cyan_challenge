const db = require('../models/index')

module.exports = {
    async register(req, res, next, io){
        
        const {farmCode, code} = req.body;
        const point = {type:'Point', coordinates:req.body.coordinates}

        if(await db.Field.findByPk(code)) return res.json({ error: "Field already exists" })

        const field = await db.Field.create({"code":code,"coordinates":point, "farmCode":farmCode});
        
        io.emit('entity-created', {message:`Field created: ${code}` })
        return res.json(field);
    },

    async show(req, res){
        return res.json(await db.Field.findAll({include:{association:'farm'}}));
    },

    async findByCode(req,res){
        const{id} = req.params;

        const field = await db.Field.findByPk(id, {include:{association:'farm'}});

        if(!field) return res.json("Field with code "+id+" not found");

        return res.json(field);
    }
}