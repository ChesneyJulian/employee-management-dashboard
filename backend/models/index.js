const Employee = require('./Employee');
const Department = require('./Department');
const Location = require('./Location');
const Projects = require('./Projects');
const Timesheet = require('./Timesheet');
const EmployeeProjects = require('./junctionTables/EmployeeProjects');
const Tasks = require('./Tasks');

// Employee One to Many relationship with Timesheet
Employee.hasMany(Timesheet, {
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

// Projects One to many relationship with Tasks
Projects.hasMany(Tasks, {
    foreignKey: 'parentProject'
});

Tasks.belongsTo(Projects, {
    foreignKey: 'parentProject'
})

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


module.exports = { Employee, Department, Location, Projects, Tasks, Timesheet, EmployeeProjects }