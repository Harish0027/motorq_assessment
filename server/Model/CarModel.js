const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      unique: true,
      required: true,
    },
    rentRate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    available: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Car', carSchema);
