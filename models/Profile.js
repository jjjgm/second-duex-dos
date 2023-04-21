const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');


class Profile extends Model { }

Profile.init(
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
            unique: true,
            references: {
                model: 'user',
                key: 'username',
            }
        },
        hasPet: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        profileImg: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            }
        },
        friend_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'friend',
                id: 'id',
        }
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile',
    }
);

module.exports = Profile