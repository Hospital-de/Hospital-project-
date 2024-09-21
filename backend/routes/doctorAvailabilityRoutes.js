// routes/doctorAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const  DoctorAvailability  = require('../controllers/doctorAvailabilityController');

router.get('/hello', async (req, res) => {
    res.json("hello");
});

router.post('/availability', DoctorAvailability.addDoctorAvailability);
router.get('/availability/:doctorId', DoctorAvailability.getDoctorAvailability);





// GET availability for a specific doctor

module.exports = router;
