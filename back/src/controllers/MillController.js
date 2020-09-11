const Mill = require('../models/Mill');

module.exports = {
    async register(req, res, next, io){
        
        const { userCpf,name } = req.body;
        
        if(await Mill.findOne({name})) return res.json({error: "Mill already exists"});
        
        const mill = await Mill.create({"name":name, "userCpf":userCpf});
        
        io.emit('entity-created', {message:`Mill created: ${name}` })
        return res.json(mill);
    },
    
    async show(req, res){
        const {name} = req.query;
        
        if(name) {
            const mill = await Mill.findOne({where:{name}, include:{association:'harvests'}});
            if(mill) return res.json(mill);
            else return res.json({error:"Mill "+name+" not found."})
        }

        else return res.json(await Mill.findAll({include:{association:'owner'}}));
    },

    async findById(req, res){
        const {id} = req.params;
        
        return res.json(await Mill.findByPk(id,{include:{association:"harvests"}}));
    }
}