module.exports = (sequelize, DataTypes) =>{
    const Farm  = sequelize.define("Farm",{
        code : {type: DataTypes.INTEGER, primaryKey: true},
        name : DataTypes.STRING
    },{})

    Farm.associate = function(models){
        this.belongsTo(models.Harvest, { foreignKey: "harvestCode", as:"harvest"});
        this.hasMany(models.Field, {foreignKey:"farmCode", as: "fields"});
    }

    return Farm
}