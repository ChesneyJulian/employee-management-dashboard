const router = require('express').Router();
const { Location } = require('../../models')

// create new location
router.post('/create', async (req, res) => {
    try {
        const newLocation = await Location.create({
            address: req.body.address,
            employeeParking: req.body.employeeParking
        });
        if (newLocation) {
            res.status(200).json(newLocation);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get all location data 
router.get('/all', async (req, res) => {
    try {
        const locationData = await Location.findAll();
        if (locationData) {
            res.status(200).json(locationData);
        };
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;