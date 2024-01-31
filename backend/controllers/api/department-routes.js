const router = require('express').Router();
const { Department, Location, Employee } = require('../../models')

// create department
router.post('/create', async (req, res) => {
    try {
        const newDepartment = await Department.create({
            title: req.body.title,
            locationId: req.body.locationId
        });
        if (newDepartment) {
            res.status(200).json(newDepartment);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get all departments and include models Location and Employee
router.get('/all', async (req, res) => {
    try {
        const departmentData = await Department.findAll({ include: [{ model: Location }, { model: Employee }] })
        if (departmentData) {
            return res.status(200).json( departmentData );
        } 
    } catch (err) {
        res.status(500).json(err);
    }
})

// get single department with id that matches req.body departmentId 
//  include models Employee and Location
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

// delete department with id that matches req.body.id
router.post('/delete', async (req, res) => {
    try {
        const deletedDepartment = await Department.destroy({
            where: {
                id: req.body.id
            }
        })
        if (deletedDepartment) {
            res.status(200).json(deletedDepartment)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;