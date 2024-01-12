const router = require('express').Router();
const { Location } = require('../../models')

router.post('/create', async (req, res) => {
    try {
        const newLocation = await Location.create({
            address: req.body.address,
            employeeParking: req.body.employeeParking
        });
        if (newLocation) {
            res.status(200).json(newLocation);
        } else {
            res.status(404).json('New location not found');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        if (locationData) {
            res.status(200).json(locationData);
        } else {
            res.status(404).json('No locations found.')
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;