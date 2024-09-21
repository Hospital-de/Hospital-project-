const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactUsRoutes = require('./routes/contactUsRoutes');
const paymentRoutes = require("./routes/PayPalRoutes");

require('dotenv').config();
const paypalRoutes = require('./routes/PayPalRoutes');
const app = express();
const PORT = process.env.PORT || 4025;

app.use(cors());
app.use(express.json());


app.use('/paypal', paypalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact-us', contactUsRoutes);
app.use("/api/payments", paymentRoutes);
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the PostgreSQL database');
  }
});
// //pasce/////////////////////
// // PayPal configuration
// const clientId = 'AZZnJo9B4ulFid8Kdc6--QozivoXGg7263KyHe5KFomW-t-qQQ4cWR7l2lFScv10s0N_iq-DQpewLwDJ';
// const clientSecret = 'EGVs4UDLD0sZ9fKq69TO2mJkqpR1ZOUt2gRWi36yLdGWFSjKNoEc_pJe6Wq7b0-Jn0UeZ2LNIMnIN_nv';

// const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
// const client = new paypal.core.PayPalHttpClient(environment);

// // Create PayPal order
// app.post('/create-order', async (req, res) => {
//   const { amount } = req.body;
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.prefer("return=representation");
//   request.requestBody({
//     intent: 'CAPTURE',
//     purchase_units: [{
//       amount: {
//         currency_code: 'USD',
//         value: amount
//       }
//     }]
//   });

//   try {
//     const order = await client.execute(request);
//     res.json({ id: order.result.id });
//   } catch (error) {
//     console.error('Error creating PayPal order:', error);
//     res.status(500).json({ error: 'Failed to create PayPal order.' });
//   }
// });

// // Capture PayPal order and save to database
// app.post('/capture-order', async (req, res) => {
//   const { orderId, userId, amount, appointmentId } = req.body;
//   console.log(req.body)
//   const request = new paypal.orders.OrdersCaptureRequest(orderId);
//   request.requestBody({});

//   try {
//     const capture = await client.execute(request);
//     const paymentStatus = capture.result.status;

//     if (paymentStatus !== 'COMPLETED') {
//       return res.status(400).json({ error: 'Order not completed' });
//     }

//     const query = `
//       INSERT INTO Payments (user_id, amount, payment_status, appointment_id)
//       VALUES ($1, $2, $3, $4) RETURNING *;
//     `;
//     const values = [1, amount, paymentStatus, 1];

//     const result = await pool.query(query, values);
    
//     res.json({
//       captureId: capture.result.id,
//       status: paymentStatus,
//       payer: capture.result.payer,
//       dbResult: result.rows[0]
//     });

//   } catch (error) {
//     console.error('Error capturing PayPal order:', error);
//     res.status(500).json({ error: 'Failed to capture PayPal order.' });
//   }
// });






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});