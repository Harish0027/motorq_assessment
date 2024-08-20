const express = require('express');
const connectToMongoose = require('./database/db');
const cors = require('cors');
const dotenv = require('dotenv');
const CustomerRouter = require('./Routes/CustomerRoute');
const CarRouter = require('./Routes/CarRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', CustomerRouter);
app.use('/api/car', CarRouter);

// Connect to MongoDB
connectToMongoose();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`The server is running on Port: ${PORT}`);
});
