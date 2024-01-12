const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {};

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
       },
       lastName: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       departmentId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        references: {
            model: 'department',
            key: 'id'
        }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'employee'
    });

    module.exports = Employee;
