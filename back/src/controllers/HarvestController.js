const Harvest = require("../models/Harvest")
module.exports = {
    async register(req, res){
        const{millName} = req.params;
        const {code, start, end} = req.body;

        const harvest = await Harvest.create({"code":code,"start":start,"end":end, "millName":millName});

        return res.json(harvest);
    },

    async show(req, res){
        const {userCPf, millName} = req.params;
        return res.json(await Harvest.findAll({
            where:{millName:millName},
            include:{association:'mill'}}));
    }
}