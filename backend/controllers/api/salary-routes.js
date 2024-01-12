const router = require('express').Router();
const { Salary, Employee } = require('../../models');

router.post('/create', async (req, res) => {
    try {
        const hourlyFromAnnual = await (req.body.annual) / 2080;
        const newSalary = await Salary.create({
            annual: req.body.annual,
            hourly: Number(hourlyFromAnnual.toFixed(2)),
            employeeId: req.body.employeeId
        });
        if (newSalary) {
            res.status(200).json(newSalary);
        } else {
            res.status(404).json('New salary not found');
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router;