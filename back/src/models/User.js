
const {Model, DataTypes} = require('sequelize');

class User extends Model{
    static init(connection){
        super.init({
            cpf: {type: DataTypes.STRING, primaryKey: true},
            name: {type: DataTypes.STRING},
            password: {type: DataTypes.STRING},
            email: {type: DataTypes.STRING}
        },
        {
            sequelize: connection
        });
    };

    static associate(models){
        this.hasMany(models.Mill,{
            foreignKey:"userCpf",
            as: "mills"
        });
    };
};
module.exports = User;