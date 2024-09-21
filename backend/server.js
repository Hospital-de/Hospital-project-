const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const admain = require("./routes/admainRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4025;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admain", admain);

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the PostgreSQL database");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
