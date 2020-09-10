const Field = require('../models/Field');

module.exports = {
    async register(req, res){
        
        const {farmCode, code} = req.body;
        const point = {type:'Point', coordinates:req.body.coordinates}

        const field = await Field.create({"code":code,"coordinates":point, "farmCode":farmCode});

        return res.json(field);
    },

    async show(req, res){
        return res.json(await Field.findAll({include:{association:'farm'}}));
    }
}