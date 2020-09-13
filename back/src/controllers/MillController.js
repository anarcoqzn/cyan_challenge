const Farm = require('../models/Farm');
const Field = require('../models/Field');
const Harvest = require('../models/Harvest');
const Mill = require('../models/Mill');

module.exports = {
    async register(req, res, next, io){
        
        const { name } = req.body;
        const temp = await Mill.findOne({where:{name}});
        console.log(temp)
        if(temp) return res.json({error: "Mill already exists"});
        
        const mill = await Mill.create({"name":name});
        
        io.emit('entity-created', {message:`Mill created: ${name}` })
        return res.json(mill);
    },
    
    async show(req, res){
        const {name} = req.query;
        
        if(name) {

            const mill = await Mill.findOne({
                where:{name}, 
                include:[{
                        model: Harvest, 
                        as:'harvests',
                        include:[{
                            model: Farm,
                            as: 'farms',
                            include:[{
                                model: Field,
                                as: 'fields',
                                attributes:['code', 'coordinates']
                            }],
                            attributes:{
                                exclude:['name', 'createdAt', 'updatedAt','harvestCode']
                            }
                        }],
                        attributes:{
                            exclude:['start', 'end','createdAt', 'updatedAt','millId']
                        }
                    }],
                    attributes:{
                        exclude:['createdAt', 'updatedAt', 'id','name']
                    }
                });

            if(mill) return res.json(mill);
            else return res.json({error:"Mill "+name+" not found."})
        }

        else return res.json(await Mill.findAll({include:{association:"harvests"}}));
    },

    async findById(req, res){
        const {id} = req.params;
        const mill = await Mill.findOne({where:{id}, include:{association:'harvests'}})

        return res.json(mill)
    },
}