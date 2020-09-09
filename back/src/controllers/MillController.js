const Mill = require('../models/Mill');

module.exports = {
    async register(req, res){
        console.log(req.body)
        const { userCpf,name } = req.body;
        const mill = await Mill.create({"name":name, "userCpf":userCpf});

        return res.json(mill);
    },

    async show(req, res){
        return res.json(await Mill.findAll({include:{association:'owner'}}));
    },
    async findMillByName(req, res){
        const {millName} = req.params;

        return res.json(await Mill.findOne({millName, include:{association:"harvests"}}))
    },

    async findById(req, res){
        const {id} = req.params;

        return res.json(await Mill.findOne({where:{id}, include:{association:"harvests"}}));
    }
}