const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class EmployeeProjects extends Model {};

EmployeeProjects.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // reference to Employee model
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'employee',
                key: 'id'
            }
        },
        // reference to Projects model
        projectId: {
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
        modelName: 'employeeProjects'
    });

    module.exports = EmployeeProjects;

