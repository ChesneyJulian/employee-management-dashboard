const router = require('express').Router();
const { Projects, EmployeeProjects, Employee } = require('../../models');

router.post('/create', async (req, res) => {
    try {
        const newProject = await Projects.create({
            title: req.body.title,
            description: req.body.description
        }).then((project) => {
            if (req.body.employeeIds.length) {
                const employeeIdArr = req.body.employeeIds.map((employeeId) => {
                    return {
                        projectId: project.id,
                        employeeId
                    };
                });
                return EmployeeProjects.bulkCreate(employeeIdArr);
            }
        })
        if (newProject) {
            res.status(200).json(newProject);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const projectData = await Projects.findAll({ include: [{ model: Employee }]});
        if (projectData) {
            res.status(200).json(projectData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;