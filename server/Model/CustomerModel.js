const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    default: 'customer',
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
