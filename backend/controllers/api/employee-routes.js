const router = require('express').Router();
const { Employee, Department, Salary, Projects } = require('../../models')

router.post('/create', async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            departmentId: req.body.departmentId
        });

        if (newEmployee) {
            res.status(200).json(newEmployee);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const employeeData = await Employee.findAll({ include: 
        [{
            model: Salary
        },
        {
            model: Department
        },
        {
            model: Projects
        }]
        });
        if (employeeData) {
            res.status(200).json(employeeData);
        } else {
            res.status(404).json('No employee data found')
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;