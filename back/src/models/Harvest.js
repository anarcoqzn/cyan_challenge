module.exports = (sequelize, DataTypes) =>{
    const Harvest  = sequelize.define("Harvest",{
        code :{type: DataTypes.INTEGER, primaryKey: true},
        start : DataTypes.DATE,
        end : DataTypes.DATE
    },{})

    Harvest.associate = function(models){
        this.belongsTo(models.Mill, { foreignKey: "millId", as:"mill"});
        this.hasMany(models.Farm,{foreignKey : "harvestCode",as: "farms"});
    }

    return Harvest
}