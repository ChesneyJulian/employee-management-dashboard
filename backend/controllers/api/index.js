const router = require('express').Router();

const departmentRoutes = require('./department-routes');
const employeeRoutes = require('./employee-routes');
const locationRoutes = require('./location-routes');
const projectsRoutes = require('./projects-routes');
const salaryRoutes = require('./salary-routes');
const timesheetRoutes = require('./timesheet-routes');

router.use('/department', departmentRoutes);
router.use('/employee', employeeRoutes);
router.use('/location', locationRoutes);
router.use('/projects', projectsRoutes);
router.use('/salary', salaryRoutes);
router.use('/timesheet', timesheetRoutes);


module.exports = router;