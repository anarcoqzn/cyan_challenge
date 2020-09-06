const Harvest = require("../models/Harvest")
module.exports = {
    async register(req, res){
        const{millName} = req.params;
        const {code, start, end} = req.body;

        const harvest = await Harvest.create({"code":code,"start":start,"end":end, "millName":millName});

        return res.json(harvest);
    },

    async show(req, res){
        return res.json(await Harvest.findAll({include:{association:'mill'}}));
    }
}