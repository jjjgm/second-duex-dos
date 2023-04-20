const sequelize = require('../config/connection');
const { Model , DataTypes } = require('sequelize');


class Friend extends Model { }

Friend.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'username',
            },
        },
        hasPet: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        profile_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'profile',
                key: 'id',
            },
        },
    },
    {
        sequelize,
            timeStamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'friend'
        }
)

module.exports = Friend