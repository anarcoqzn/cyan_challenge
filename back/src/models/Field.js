const {Model, DataTypes} = require('sequelize');

class Field extends Model {
    static init(connection){
        super.init({
            code: {type: DataTypes.INTEGER, primaryKey: true},
            coordinates: DataTypes.GEOMETRY('Point')
        },
        {
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.Farm, { foreignKey: "farmCode", as: "farm"});
    }
}

module.exports = Field;