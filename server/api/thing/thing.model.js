'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Thing', {
    id: {
      type:  DataTypes.UUID ,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4 
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },{
    timestamps: true, 
    underscored: true,
    freezeTableName:true,
    tableName:'things'
    
  });
};
