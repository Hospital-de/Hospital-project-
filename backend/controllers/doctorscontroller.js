const pool = require('../config/db');

exports.getAllDoctors = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, dd.hospital_name, dd.phone_number, dd.address, dd.image
      FROM Users u
      LEFT JOIN DoctorDetails dd ON u.id = dd.doctor_id
      WHERE u.role = 'Doctor' AND u.is_deleted = FALSE
      ORDER BY u.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'An error occurred while fetching doctors' });
  }
};

exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, dd.hospital_name, dd.phone_number, dd.address, dd.image
      FROM Users u
      LEFT JOIN DoctorDetails dd ON u.id = dd.doctor_id
      WHERE u.id = $1 AND u.role = 'Doctor' AND u.is_deleted = FALSE
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'An error occurred while fetching the doctor' });
  }
};