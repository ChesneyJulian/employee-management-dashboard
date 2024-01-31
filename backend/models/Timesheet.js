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
        },
        hoursWorked: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        // reference to Employee model
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
            // ensures that one worker does not create multiple timesheets for one date
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
