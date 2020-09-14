module.exports = (sequelize, DataTypes) =>{
    const Field  = sequelize.define("Field",{
        code: {type: DataTypes.INTEGER, primaryKey: true},
        coordinates: DataTypes.GEOMETRY('Point')
    },{})

    Field.associate = function(models){
        this.belongsTo(models.Farm, { foreignKey: "farmCode", as:"farm"});
    }

    return Field
}