const Farm = require('../models/Farm');
const { findById } = require('./MillController');

module.exports = {
    async register(req, res){
        const {harvestCode, code, name} = req.body;
        
        if(await Farm.findByPk(code)) return res.status(400).send("Farm already exists");

        const farm = await Farm.create({"code":code,"name":name, "harvestCode": harvestCode})

        return res.status(200).send("Novo Farm "+farm.name+ " criado!");
    },

    async show(req,res){
        return res.json(await Farm.findAll({include:{association:'harvest'}}));
    },

    async findById(req,res){
        const {id} = req.params;

        const farm = await Farm.findByPk(id, {include:{association:"fields"}})

        if(!farm) return res.status(404).send("Farm not found")

        return res.status(200).json(farm);
    }
}