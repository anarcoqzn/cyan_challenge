const Farm = require('../models/Farm');
const Field = require('../models/Field');
const Harvest = require('../models/Harvest');

module.exports = {
    async register(req, res, next, io){
        const {harvestCode, code, name} = req.body;
        
        if(await Farm.findByPk(code)) return res.json({ error: "Farm already exists" });

        const farm = await Farm.create({"code":code,"name":name, "harvestCode": harvestCode})

        io.emit('entity-created', {message:`Farm created: ${code}` })
        return res.status(200).send("Novo Farm "+farm.name+ " criado!");
    },

    async show(req,res){
        const {name} =req.query;

        if(name){
            const farm = await Farm.findOne({
                where:{name}, 
                include:[{model: Field, as:'fields'}],
                attributes:{
                    exclude:['name', 'createdAt', 'updatedAt', 'harvestCode']
                }
            })

            if(farm) return res.json(farm);
            else return res.json({error:"Farm "+name+" not found"})

        }else{
            return res.json(await Farm.findAll({include:{association:'fields'}}));
        }
    },

    async findByCode(req,res){
        const {id} = req.params;

        const farm = await Farm.findByPk(id, {
            include:[{model: Field, as:'fields'}],
            attributes:{
                exclude:['name', 'createdAt', 'updatedAt', 'harvestCode']
                }
            }
        )

        if(!farm) return res.status(404).send("Farm not found")

        return res.status(200).json(farm);
    }
}