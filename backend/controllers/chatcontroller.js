const pool = require('../config/db');

exports.getChatHistory = async (req, res) => {
  const { userId, doctorId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM messages WHERE (user_id = $1 AND doctor_id = $2) OR (user_id = $2 AND doctor_id = $1) ORDER BY created_at ASC',
      [userId, doctorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'An error occurred while fetching chat history' });
  }
};

exports.saveMessage = async (req, res) => {
  const { user_id, doctor_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (user_id, doctor_id, message) VALUES ($1, $2, $3) RETURNING *',
      [user_id, doctor_id, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
};