const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Projects extends Model {};

Projects.init(
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
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'projects'
    });

module.exports = Projects;