const Harvest = require("../models/Harvest");
const { show } = require("./FieldController");
module.exports = {
    async register(req, res){
        const{millName} = req.params;
        const {code, start, end} = req.body;

        const harvest = await Harvest.create({"code":code,"start":start,"end":end, "millName":millName});

        return res.json(harvest);
    },

    async getHarvestsFromMill(req, res){
        console.log(req.query)
        const {millName} = req.query;
        return res.json(await Harvest.findAll({
            where:{millName:millName},
            include:{association:'mill'}}));
    },

    async show(req,res){
        return res.json(await Harvest.findAll({include:{association:'mill'}}));
    }
}