const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tasks extends Model {};

Tasks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        inProgress: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        //  reference to Project model
        parentProject: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'projects',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'tasks'
    });

module.exports = Tasks;