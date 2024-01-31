const router = require('express').Router();
const { Projects, EmployeeProjects, Employee, Tasks, Department } = require('../../models');

// create new project 
router.post('/create', async (req, res) => {
    try {
        const newProject = await Projects.create({
            title: req.body.title,
            description: req.body.description
        }).then((project) => {
            // map employeeIds into proper format for EmployeeProjects model
            if (req.body.employeeIds.length) {
                const employeeIdArr = req.body.employeeIds.map((employeeId) => {
                    return {
                        projectId: project.id,
                        employeeId
                    };
                });
                // bulk create EmployeeProjects
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

// get all projects
router.get('/all', async (req, res) => {
    try {
        const projectData = await Projects.findAll({});
        if (projectData) {
            res.status(200).json(projectData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// find single project that matches req.body projectId
// include models Tasks and Employee, which includes Department
router.post('/', async (req, res) => {
    try {
        const singleProjectData = await Projects.findByPk(req.body.projectId, {
            include: [
                {
                    model: Tasks
                },
                {
                    model: Employee, include: [{ model: Department}]
                }
            ]
        });
        if (singleProjectData) {
            res.status(200).json(singleProjectData);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// delete project with id that matches req.body id
router.post('/delete', async (req, res) => {
    try {
        const deletedProject = await Projects.destroy({
            where: {
                id: req.body.id
            }
        })
        if (deletedProject) {
            res.status(200).json(deletedProject);
        }
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;