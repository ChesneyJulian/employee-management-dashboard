const router = require('express').Router();
const { Employee, Department, Projects } = require('../../models')
const { signToken } = require('../../utils/auth');
// create new employee data
router.post('/create', async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            departmentId: req.body.departmentId,
            email: req.body.email,
            password: req.body.password
        });

        if (newEmployee) {
            res.status(200).json(newEmployee);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all employees
router.get('/all', async (req, res) => {
    try {
        const employeeData = await Employee.findAll({ include: 
        [
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
});

// get single employee data
router.get('/', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk({ include: 
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
            }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const employeeData = await Employee.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!employeeData)  return res.status(400).json({ message: 'Incorrect email.'});

        const correctPassword = employeeData.checkPassword(req.body.password);

        if (correctPassword) {
           const token =  signToken(employeeData);
            res.status(200).json(token);
        } else {
            return res.status(404).json({ message: 'Incorrect password'});
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// router.post('/logout', async (req, res) => {
//     try {} catch(err) {

//     }
// })

module.exports = router;