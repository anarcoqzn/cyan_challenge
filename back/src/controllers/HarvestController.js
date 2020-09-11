const Harvest = require("../models/Harvest");

module.exports = {
    async register(req, res, next, io){
        
        const {millId,code, start, end} = req.body;

        if(await Harvest.findByPk(code)) return res.json({error: "Farm already exists"})

        const harvest = await Harvest.create({code, start, end, millId});

        io.emit('entity-created', {message:`Harvest created: ${code}` })
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