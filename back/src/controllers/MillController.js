const Mill = require('../models/Mill');

module.exports = {
    async register(req, res){
        
        const { userCpf,name } = req.body;
        if(userCpf.length === 11 && name.length > 0)   {
            const mill = await Mill.create({"name":name, "userCpf":userCpf});
            return res.json(mill);
        } else {
            return res.status(500).send("Invalid data")
        }
    },

    async show(req, res){
        return res.json(await Mill.findAll({include:{association:'owner'}}));
    },

    async findById(req, res){
        const {id} = req.params;

        return res.json(await Mill.findOne({where:{id}, include:{association:"harvests"}}));
    }
}