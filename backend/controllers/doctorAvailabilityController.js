// controllers/doctorAvailabilityController.js
const pool = require('../config/db');

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
  const { doctor_id, date } = req.query; // Receive doctor_id and date as query parameters

  let query = `SELECT * FROM DoctorAvailability WHERE doctor_id = $1 AND is_deleted = FALSE`;
  let values = [doctor_id];

  if (date) {
    query += ' AND date = $2';
    values.push(date); // Add the date to the query
  }

  try {
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  addDoctorAvailability,
  getDoctorAvailability
};
