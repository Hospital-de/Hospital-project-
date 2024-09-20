const pool = require('../config/db');

// Fetch appointments for a specific doctor and include total count of appointments and unique patients
exports.getDoctorAppointments = async (req, res) => {
    const { doctorId } = req.params;

    try {
        // SQL query to fetch appointments with patient details for the given doctor
        const result = await pool.query(
            `
            SELECT 
                a.id AS appointment_id,
                a.status AS appointment_status,
                a.notes AS appointment_notes,
                da.date AS appointment_date,
                da.time_slot AS appointment_time,
                u.id AS patient_id,
                u.name AS patient_name,
                u.email AS patient_email
            FROM Appointments a
            JOIN DoctorAvailability da ON a.availability_id = da.id
            JOIN Users u ON a.patient_id = u.id
            WHERE da.doctor_id = $1
            AND a.is_deleted = false
            AND da.is_deleted = false
            `,
            [doctorId]
        );

        // Get total count of appointments
        const totalAppointments = result.rowCount;

        // Get unique count of patients
        const uniquePatientsResult = await pool.query(
            `
            SELECT COUNT(DISTINCT u.id) AS total_unique_patients
            FROM Appointments a
            JOIN DoctorAvailability da ON a.availability_id = da.id
            JOIN Users u ON a.patient_id = u.id
            WHERE da.doctor_id = $1
            AND a.is_deleted = false
            AND da.is_deleted = false
            `,
            [doctorId]
        );

        const totalPatients = uniquePatientsResult.rows[0].total_unique_patients;

        // Check if any appointments found
        if (totalAppointments === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor.' });
        }

        // Send response with appointment details, total appointments, and total unique patients
        res.json({
            total_appointments: totalAppointments,
            total_patients: totalPatients,
            appointments: result.rows,
        });
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
