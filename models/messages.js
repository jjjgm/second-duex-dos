// models/messages.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Messages extends Model {}

Messages.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
},
{
  sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'messages',
});

module.exports = Messages;
