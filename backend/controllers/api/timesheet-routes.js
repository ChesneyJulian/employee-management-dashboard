const router = require('express').Router();
const { Timesheet, Employee } = require('../../models')

router.post('/create', async (req, res) => {
    try {
        const newTimesheet = await Timesheet.create({
            date: req.body.date,
            hoursWorked: req.body.hoursWorked,
            worker: req.body.worker
        });
        if (newTimesheet) {
            res.status(200).json(newTimesheet);
        } else {
            res.status(4).json('New timesheet not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const employeeTimesheetData = await Timesheet.findAll({
            where: {
                worker: req.body.employeeId
            },
            order: [['date', 'DESC']],
            include: [{ model: Employee }]
         });
         if (employeeTimesheetData) {
            res.status(200).json(employeeTimesheetData);
         };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;