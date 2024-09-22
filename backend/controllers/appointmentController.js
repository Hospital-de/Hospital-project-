// appointmentController.js

const pool = require("../config/db");

exports.getUserAppointments = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    const query = `
      SELECT 
        a.id AS appointment_id,
        a.status AS appointment_status,
        a.notes AS appointment_notes,
        da.date AS appointment_date,
        da.time_slot AS appointment_time,
        CASE 
          WHEN u.role = 'Patient' THEN doctor.name
          WHEN u.role = 'Doctor' THEN patient.name
        END AS other_party_name,
        u.role AS user_role
      FROM 
        Appointments a
      JOIN 
        DoctorAvailability da ON a.availability_id = da.id
      JOIN 
        Users u ON (u.id = $1)
      JOIN 
        Users doctor ON (a.doctor_id = doctor.id)
      JOIN 
        Users patient ON (a.patient_id = patient.id)
      WHERE 
        (a.patient_id = $1 OR a.doctor_id = $1)
        AND a.is_deleted = FALSE
      ORDER BY 
        da.date, da.time_slot;
    `;

    const result = await pool.query(query, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Дополнительные функции для работы с назначениями

exports.createAppointment = async (req, res) => {
  // Реализация создания нового назначения
};

exports.updateAppointment = async (req, res) => {
  // Реализация обновления назначения
};

exports.deleteAppointment = async (req, res) => {
  // Реализация удаления назначения (soft delete)
};
