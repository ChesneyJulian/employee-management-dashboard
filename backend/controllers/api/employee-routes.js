const router = require('express').Router();
const { Employee, Department, Projects, Tasks, Location } = require('../../models')
const { signToken } = require('../../utils/auth');

// create new employee 
router.post('/create', async (req, res) => {
    try {
        const newEmployee = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            departmentId: req.body.departmentId,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            admin: req.body.admin
        });

        if (newEmployee) {
            res.status(200).json(newEmployee);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete employee with id that matches req.body id
router.post('/delete', async (req, res) => {
    try {
        const employeeData = await Employee.destroy({
            where: {
                id: req.body.id
            }
        });
        if (employeeData){
            res.status(200).json(employeeData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get all employees and include models Department and Projects
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
        };
    } catch (err) {
        res.status(500).json(err);
    }
});

// find single employee by req.body id and include model Projects which includes model Tasks
router.post('/your-projects', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.body.id, 
            {
            include: [ {model: Projects, attributes: [ 'title', 'description', 'id'], include: [ Tasks]}],
            });
            if (employeeData) {
                return res.status(200).json(employeeData);
            }
    } catch (err) {
        res.status(500).json(err);
    }
});

// find employee by req.body id and include model Department which includes Location
router.post('/', async (req, res) => {
    try {
        const employeeData = await Employee.findByPk(req.body.id, {
            include: [{
                model: Department, include: [{ model: Location }]
            }]
        });
        if (employeeData) {
            return res.status(200).json(employeeData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// find employee with email that matches req.body email
router.post('/login', async (req, res) => {
    try {
        const employeeData = await Employee.findOne({
            where: {
                email: req.body.email
            }
        })
        if (!employeeData)  return res.status(400).json({ message: 'Incorrect email.'});
        // check req.body password against encrypted password in database
        const correctPassword = employeeData.checkPassword(req.body.password);

        if (correctPassword) {
            // sign jwt for authentication and return token along with employeeData
           const token =  signToken(employeeData);
            res.status(200).json({ token, employeeData });
        } else {
            return res.status(404).json({ message: 'Incorrect password'});
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// update employee info with id that matches req.body id 
router.put('/edit', async (req, res) => {
    try {
        const updatedData = await Employee.update({
            phoneNumber: req.body.phoneNumber,
            email: req.body.email
        }, 
        {
            where: {
                id: req.body.employeeId
            }
        })
        if (updatedData) {
            res.status(200).json(updatedData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;