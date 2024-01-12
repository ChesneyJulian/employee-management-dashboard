const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {};

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
//    CREATE RELATIONSHIP TO LOCATION
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'location',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'department'
    });

    module.exports = Department;