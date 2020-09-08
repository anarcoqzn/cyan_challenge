const Farm = require('../models/Farm');
const { show } = require('./FieldController');

module.exports = {
    async register(req, res){
        const {harvestCode} = req.params;
        const {code, name} = req.body;

        const farm = await Farm.create({"code":code,"name":name,"fieldsId":fieldsId, "HarvestCode": harvestCode});

        return res.json(farm);
    },

    async getFarmsFromHarvest(req, res){
        const {harvestCode} = req.params;
        return res.json(await Farm.findAll({
            where:{harvestCode:harvestCode},
            include:{association:'harvest'}}));
    },
    async show(req,res){
        return res.json(await Farm.findAll({include:{association:'harvest'}}));
    }
}