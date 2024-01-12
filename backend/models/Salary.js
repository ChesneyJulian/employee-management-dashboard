const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Salary extends Model {};

Salary.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        annual: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hourly: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
//    CREATE RELATIONSHIP TO EMPLOYEE
        employeeId: {
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
        modelName: 'salary'
    });

    module.exports = Salary;