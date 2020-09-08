const {Model, DataTypes} = require('sequelize');

class Harvest extends Model{
    static init(connection){
        super.init({
            code :{type: DataTypes.INTEGER, primaryKey: true},
            start : DataTypes.DATE,
            end : DataTypes.DATE
        },
        {
            sequelize : connection
        })
    }

    static associate(models){
        this.belongsTo(models.Mill, {
            foreignKey:'millId',
            as:'mill'
        });

        this.hasMany(models.Farm,{
            foreignKey : "harvestCode",
            as: "farms"
        })
    }
}

module.exports = Harvest;