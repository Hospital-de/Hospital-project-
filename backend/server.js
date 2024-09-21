const express = require('express');
const cors = require('cors');
const http = require('http');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorsroutes');
const doctorAvailabilityRoutes = require('./routes/doctorAvailabilityRoutes');
const chatRoutes = require('./routes/chatroutes');
const setupSocketIO = require('./socketHandler');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = setupSocketIO(server);

const PORT = process.env.PORT || 4025;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api', doctorAvailabilityRoutes);
app.use('/api/chat', chatRoutes);

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});