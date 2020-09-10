const Harvest = require("../models/Harvest");

module.exports = {
    async register(req, res){
        
        const {millId,code, start, end} = req.body;

        const harvest = await Harvest.create({code, start, end, millId});

        return res.json(harvest);
    },

    async show(req,res){
        
        const millId = req.query.millId;
        if (millId){
            return res.json(await Harvest.findAll({where:{millId},include:{association:'mill'}}))
        }
        return res.json(await Harvest.findAll());
    },

    async getHarvest(req, res){
        const{id} = req.params;

        const harvest = await Harvest.findOne({where:{code:id}, include:{association:'farms'}})

        return res.json(harvest)
    }
}