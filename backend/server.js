const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require("./routes/profileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicalRecordsRoutes = require("./routes/MedicalRecordsRoutes");


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4025;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordsRoutes);


pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});