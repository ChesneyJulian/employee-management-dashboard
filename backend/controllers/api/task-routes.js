const router = require('express').Router();
const { Projects, Tasks } = require('../../models');

router.post('/create', async (req, res) => {
    try {
        const newTask = await Tasks.create({
            title: req.body.title,
            description: req.body.description,
            inProgress: req.body.inProgress,
            completed: req.body.completed,
            parentProject: req.body.projectId
        });

        if (newTask) {
            res.status(200).json(newTask);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/edit', async (req, res) => {
    try {
        const updatedData = await Tasks.update({
            description: req.body.description,
            inProgress: req.body.inProgress,
            completed: req.body.completed
        }, 
        {
            where: {
                id: req.body.id
            }
        });
        if (updatedData) {
            res.status(200).json(updatedData);
        }
    } catch (err) {
        res.status(500).json(err)
    };
})

module.exports = router;