module.exports = (sequelize, DataTypes) =>{
    const Mill  = sequelize.define("Mill",{
        name: {type: DataTypes.STRING}
    },{});

    Mill.associate = function(models){
        this.hasMany(models.Harvest,{foreignKey : "millId",as: "harvests"});
    }

    return Mill
}
