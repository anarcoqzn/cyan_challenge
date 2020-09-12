const {Model, DataTypes} = require('sequelize');

class Mill extends Model{
    static init(connection){
        super.init({
            name: {type: DataTypes.STRING}
        },
        {
            sequelize : connection
        })
    }

    static associate(models){
       this.hasMany(models.Harvest,{
            foreignKey:"millId",
            as:"harvests"
        })
    }
}
module.exports = Mill;
