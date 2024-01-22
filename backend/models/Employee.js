const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Employee extends Model {
    // method to check that password attempt matches hashed password upon login
    checkPassword(passwordAttempt) {
        return bcrypt.compareSync(passwordAttempt, this.password)
    }
};

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
       email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
       },
       password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // must include at least one digit between 0-9 and one letter between a-z
            is: /^[0-9a-z]{8,24}$/i
        }
       },
       departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'department',
            key: 'id'
        }
       }
    },
    {
        hooks: {
            // use bcrypt to hash password upon creation of new employee data
            async beforeCreate(newEmployee) {
                newEmployee.password = await bcrypt.hash(newEmployee.password, 10);
                return newEmployee;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'employee'
    });

    module.exports = Employee;
