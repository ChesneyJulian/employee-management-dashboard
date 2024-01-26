const router = require('express').Router();
const { Department, Location, Employee } = require('../../models')

router.post('/create', async (req, res) => {
    try {
        const newDepartment = await Department.create({
            title: req.body.title,
            locationId: req.body.locationId
        });
        if (newDepartment) {
            res.status(200).json(newDepartment);
        } else {
            res.status(404).json('New department not found');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/all', async (req, res) => {
    try {
        const departmentData = await Department.findAll({ include: [{ model: Location }, { model: Employee }] })
        if (departmentData) {
            console.log(departmentData);
            return res.status(200).json( departmentData );
        } 
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/your-department', async (req, res) => {
    try {
        const departmentData = await Department.findByPk(req.body.departmentId, {
            include: [
                {
                    model: Employee
                },
                {
                    model: Location
                }
            ]
        })
        if (departmentData) {
            res.status(200).json(departmentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;