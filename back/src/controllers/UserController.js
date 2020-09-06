const User = require('../models/User');

module.exports = {
    async register(req, res){
        
        const {cpf, name, email, password} = req.body;
        const user = await User.create({"cpf":cpf,"name":name, "email":email, "password":password});
        
        return res.json(user);
    },

    async show(req, res){
        return res.json(await User.findAll());
    }
}