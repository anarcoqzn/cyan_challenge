const Mill = require('../models/Mill');

module.exports = {
    async register(req, res){
        
        const { userCpf,name } = req.body;

        if(await Mill.findOne({name})) return res.json({error: "Mill already exists"})

        const mill = await Mill.create({"name":name, "userCpf":userCpf});

        io.emit('entity-created', {message:`Mill created: ${name}` })
        return res.json(mill);
    },

    async show(req, res){
        return res.json(await Mill.findAll({include:{association:'owner'}}));
    },

    async findById(req, res){
        const {id} = req.params;

        return res.json(await Mill.findOne({where:{id}, include:{association:"harvests"}}));
    }
}