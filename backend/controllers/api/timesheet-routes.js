const router = require('express').Router();
const { Timesheet, Employee } = require('../../models')

// create new timesheet 
router.post('/create', async (req, res) => {
    try {
        const newTimesheet = await Timesheet.create({
            date: req.body.date,
            hoursWorked: req.body.hoursWorked,
            worker: req.body.worker
        });
        if (newTimesheet) {
            res.status(200).json(newTimesheet);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get all timesheets that have a worker id that matches req.body.id
// include model Employee
router.post('/', async (req, res) => {
    try {
        const employeeTimesheetData = await Timesheet.findAll({
            where: {
                worker: req.body.employeeId
            },
            // sort in descending order by date
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