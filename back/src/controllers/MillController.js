const db = require('../models/index')

module.exports = {
    async register(req, res, next, io){
        
        const { name } = req.body;
        const temp = await db.Mill.findOne({where:{name}});
        console.log(temp)
        if(temp) return res.json({error: "Mill already exists"});
        
        const mill = await db.Mill.create({"name":name});
        
        io.emit('entity-created', {message:`Mill created: ${name}` })
        return res.json(mill);
    },
    
    async show(req, res){
        const {name} = req.query;
        
        if(name) {

            const mill = await db.Mill.findOne({
                where:{name}, 
                include:[{
                        model: db.Harvest, 
                        as:'harvests',
                        include:[{
                            model: db.Farm,
                            as: 'farms',
                            include:[{
                                model: db.Field,
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

        else return res.json(await db.Mill.findAll());
    },

    async findById(req, res){
        const {id} = req.params;
        const mill = await db.Mill.findOne({where:{id}, include:{association:'harvests'}})
        if(!mill) return res.json({error:"Mill "+id+" not found"})
        return res.json(mill)
    },
}