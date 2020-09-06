const {Model, DataTypes} = require('sequelize');

class Mill extends Model{
    static init(connection){
        super.init({
            name: {type: DataTypes.STRING, primaryKey: true}
        },
        {
            sequelize : connection
        })
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey:"userCpf",
            as:"owner"
        });

        this.hasMany(models.Harvest,{
            foreignKey:"millName",
            as:"harvests"
        })
    }
}
module.exports = Mill;
