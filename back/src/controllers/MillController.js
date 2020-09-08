const Mill = require('../models/Mill');

module.exports = {
    async register(req, res){
        const { userCpf } = req.params;
        const { name } = req.body;

        const mill = await Mill.create({"name":name, "userCpf":userCpf});

        return res.json(mill);
    },

    async show(req, res){
        return res.json(await Mill.findAll({include:{association:'owner'}}));
    },
    async findMillByName(req, res){
        const millName = req.params;

        return res.json(await Mill.findByPk({millName}))
    }
}