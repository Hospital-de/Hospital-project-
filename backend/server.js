



const admain = require("./routes/admainRoutes");
const express = require('express');
const cors = require('cors');
const http = require('http');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const paymentRoutes = require("./routes/PayPalRoutes");

const chatRoutes = require('./routes/chatroutes');
const setupSocketIO = require('./socketHandler');

const profileRoutes = require("./routes/profileRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const medicalRecordsRoutes = require("./routes/MedicalRecordsRoutes");
const doctorroutes=require('./routes/doctorsroutes');
const doctorAvailabilityRoutes = require('./routes/doctorAvailabilityRoutes')
const doctorAppointmentRoute = require('./routes/doctorAppointment')

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = setupSocketIO(server);

const PORT = process.env.PORT || 4025;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/admain", admain);
app.use("/api/profile", profileRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/medical-records", medicalRecordsRoutes);

//tasneem routes
app.use('/api', doctorAvailabilityRoutes);
app.use('/api', doctorAppointmentRoute);


app.use('/api/contact-us', contactUsRoutes);
app.use("/api/payments", paymentRoutes);
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the PostgreSQL database");
  }
});







server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
