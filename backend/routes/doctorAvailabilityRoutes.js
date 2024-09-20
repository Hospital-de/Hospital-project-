// routes/doctorAvailabilityRoutes.js
const express = require('express');
const router = express.Router();
const  DoctorAvailability  = require('../controllers/doctorAvailabilityController');
console.log('12')

router.post('/availability', DoctorAvailability.addDoctorAvailability);
router.get('/availability', DoctorAvailability.getDoctorAvailability);

module.exports = router;
