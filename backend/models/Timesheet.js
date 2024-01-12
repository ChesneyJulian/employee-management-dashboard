const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Timesheet extends Model {};

Timesheet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hoursWorked: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
//  CREATE RELATIONSHIP TO EMPLOYEE 
        worker: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employee',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'timesheet'
    });

module.exports = Timesheet;