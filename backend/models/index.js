const Employee = require('./Employee');
const Department = require('./Department');
const Location = require('./Location');
const Projects = require('./Projects');
const Salary = require('./Salary');
const Timesheet = require('./Timesheet');
const EmployeeProjects = require('./junctionTables/EmployeeProjects');


// Employee One to One relationship with Salary
Employee.hasOne(Salary, {
    foreignKey: 'employeeId'
});

Salary.belongsTo(Employee, {
    foreignKey: 'employeeId'
});

// Employee One to One relationship with Timesheet
Employee.hasOne(Timesheet, {
    foreignKey: 'worker'
});

Timesheet.belongsTo(Employee, {
    foreignKey: 'worker'
});

// Employee Many to Many relationship with Projects

Employee.belongsToMany(Projects, {
    through: EmployeeProjects,
    foreignKey: 'employeeId'
});

Projects.belongsToMany(Employee, {
    through: EmployeeProjects,
    foreignKey: 'projectId'
});

// Employee One to Many relationship with department
Department.hasMany(Employee, {
    foreignKey: 'departmentId'
});

Employee.belongsTo(Department, {
    foreignKey: 'departmentId'
});

// Department One to Many relationship with Location
Location.hasMany(Department, {
    foreignKey: 'locationId'
});

Department.belongsTo(Location, {
    foreignKey: 'locationId'
});


module.exports = { Employee, Department, Location, Salary, Projects, Timesheet, EmployeeProjects }