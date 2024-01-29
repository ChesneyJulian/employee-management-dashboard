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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            // unique: true
        },
        hoursWorked: {
            type: DataTypes.FLOAT,
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
        uniqueKeys: {
            entry_unique: {
              fields: ['worker', 'date'],
            },
          },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'timesheet'
    });

module.exports = Timesheet;
