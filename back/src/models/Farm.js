const {Model, DataTypes} = require('sequelize');

class Farm extends Model{
    static init(connection){
        super.init({
            code : {type: DataTypes.INTEGER, primaryKey: true},
            name : DataTypes.STRING
        },
        {
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.Harvest, { foreignKey: "harvestCode", as:"harvest"});
        this.hasMany(models.Field, {foreignKey:"farmCode", as: "fields"});
    }
}

module.exports = Farm;