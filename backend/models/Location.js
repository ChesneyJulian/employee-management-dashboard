const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {};

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeParking: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'location'
    });

module.exports = Location;