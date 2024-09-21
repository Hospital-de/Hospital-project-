// controllers/doctorAvailabilityController.js
const pool = require('../config/db');

console.log('11')
const addDoctorAvailability = async (req, res) => {
  const { doctor_id, date, time_slot, is_available } = req.body;

  const query = `
    INSERT INTO DoctorAvailability (doctor_id, date, time_slot, is_available)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [doctor_id, date, time_slot, is_available];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getDoctorAvailability = async (req, res) => {
  const doctorId = req.params.doctorId; // Get doctor ID from the URL
  const { date } = req.query; // Get optional date from query parameters

  // Validate input
  if (!doctorId) {
    return res.status(400).json({ error: 'doctor_id is required' });
  }

  let query = `SELECT * FROM DoctorAvailability WHERE doctor_id = $1 AND is_deleted = FALSE AND is_booked = FALSE`;
  let values = [doctorId];

  if (date) {
    query += ' AND date = $2';
    values.push(date);
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  addDoctorAvailability,
  getDoctorAvailability
};
