const db = require('../models/index')

module.exports = {
    async register(req, res, next, io){
        const {harvestCode, code, name} = req.body;
        
        if(await db.Farm.findByPk(code)) return res.json({ error: "Farm already exists" });

        const farm = await db.Farm.create({"code":code,"name":name, "harvestCode": harvestCode})

        io.emit('entity-created', {message:`Farm created: ${code}` })
        return res.status(200).send("Novo Farm "+farm.name+ " criado!");
    },

    async show(req,res){
        const {name} =req.query;

        if(name){
            const farm = await db.Farm.findOne({
                where:{name}, 
                include:[{model: db.Field, as:'fields'}],
                attributes:{
                    exclude:['name', 'createdAt', 'updatedAt', 'harvestCode']
                }
            })

            if(farm) return res.json(farm);
            else return res.json({error:"Farm "+name+" not found"})

        }else{
            return res.json(await db.Farm.findAll({include:{association:'fields'}}));
        }
    },

    async findByCode(req,res){
        const {id} = req.params;

        const farm = await db.Farm.findByPk(id, {
            include:[{model: db.Field, as:'fields'}],
            attributes:{
                exclude:['name', 'createdAt', 'updatedAt', 'harvestCode']
                }
            }
        )

        if(!farm) return res.json({error:"Farm "+id+" not found"})

        return res.status(200).json(farm);
    }
}