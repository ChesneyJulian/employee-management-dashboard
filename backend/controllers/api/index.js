const router = require('express').Router();
const taskRoutes = require('./task-routes');
const departmentRoutes = require('./department-routes');
const employeeRoutes = require('./employee-routes');
const locationRoutes = require('./location-routes');
const projectsRoutes = require('./projects-routes');
const timesheetRoutes = require('./timesheet-routes');

router.use('/department', departmentRoutes);
router.use('/employee', employeeRoutes);
router.use('/location', locationRoutes);
router.use('/projects', projectsRoutes);
router.use('/timesheet', timesheetRoutes);
router.use('/tasks', taskRoutes);


module.exports = router;