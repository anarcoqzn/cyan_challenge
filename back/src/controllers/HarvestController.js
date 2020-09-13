const { Op } = require("sequelize");
const Farm = require("../models/Farm");
const Field = require("../models/Field");
const Harvest = require("../models/Harvest");

module.exports = {
    async register(req, res, next, io){
        
        const {millId,code, start, end} = req.body;

        if(await Harvest.findByPk(code)) return res.json({error: "Harvest already exists"})

        const harvest = await Harvest.create({code, start, end, millId});

        io.emit('entity-created', {message:`Harvest created: ${code}` })
        return res.json(harvest);
    },

    async show(req,res){
        const { start, end } = req.query;

        if(start && end) {
            const harvests = await Harvest.findAll({where: {
                
                start: {[Op.gte]:start},
                end: {[Op.lte]:end}
                }, 
                include:[{
                    model: Farm,
                    as: 'farms',
                    include:[{
                        model:Field,
                        as:'fields',
                        attributes:['code', 'coordinates']
                    }],
                    attributes:{
                        exclude:['name', 'createdAt', 'updatedAt','harvestCode']
                    }
                }],
                attributes:{
                    exclude:['start', 'end','createdAt', 'updatedAt','millId']
                }
            });

            if(harvests.length === 0) return res.json({error:"There is no harvest between these dates"})
            else return res.json(harvests);

        }else{
            return res.json(await Harvest.findAll());
        }
    },

    async findByCode(req, res){
        const{id} = req.params;

        const harvest = await Harvest.findByPk(id, 
            {
            include:[{
                model: Farm,
                as:'farms',
                include:[{
                    model:Field,
                    as:'fields',
                    attributes:['code', 'coordinates']
                }],
                attributes:{
                    exclude:['name', 'createdAt', 'updatedAt','harvestCode']
                }
            }],
            attributes:{
                exclude:['start', 'end','createdAt', 'updatedAt','millId']
            }
        })

        if(!harvest) return res.json({error:"Harvest "+id+" not found"})
        return res.json(harvest)
    }
}