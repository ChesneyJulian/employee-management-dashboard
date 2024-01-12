const router = require('express').Router();
const { Timesheet, Employee } = require('../../models')

router.post('/create', async (req, res) => {
    try {
        const newTimesheet = await Timesheet.create({
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hoursWorked: req.body.hoursWorked,
            worker: req.body.worker
        });
        if (newTimesheet) {
            res.status(200).json(newTimesheet);
        } else {
            res.status(404).json('New timesheet not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employeeTimesheetData = await Timesheet.findAll({
            where: {
                worker: req.params.id
            },
            include: [{ Model: Employee }]
         });
         if (employeeTimesheetData.length) {
            res.status(200).json(employeeTimesheetData);
         } else {
            res.status(404).json('No employee timesheets found');
         }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;