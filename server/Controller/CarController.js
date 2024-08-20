const Car = require('../Model/CarModel');
const fs = require('fs');
const path = require('path');

const CarController = {
  uploadCar: async (req, res) => {
    try {
      if (!req.file || !req.file.filename) {
        return res.status(400).json({
          message: 'Image file is required!',
          success: false,
        });
      }

      const {
        make,
        model,
        year,
        licenseNumber,
        rentRate,
        location,
        description,
      } = req.body;

      if (
        !make ||
        !model ||
        !year ||
        !licenseNumber ||
        !rentRate ||
        !description
      ) {
        return res.status(400).json({
          message: 'Required fields are missing!',
          success: false,
        });
      }

      const yearNumber = parseInt(year, 10);
      const rentRateNumber = parseFloat(rentRate);

      if (isNaN(yearNumber) || isNaN(rentRateNumber)) {
        return res.status(400).json({
          message: 'Invalid data types for year or rentRate!',
          success: false,
        });
      }

      const existingCar = await Car.findOne({ licenseNumber });

      if (existingCar) {
        return res.status(409).json({
          message: 'Car with this license number already exists!',
          success: false,
        });
      }

      const newCar = new Car({
        make,
        model,
        year: yearNumber,
        licenseNumber,
        rentRate: rentRateNumber,
        location,
        image: req.file.filename,
        description,
      });

      await newCar.save();

      return res.status(201).json({
        message: 'Car uploaded successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error during car upload:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { licenseNumber } = req.params;

      const car = await Car.findOne({ licenseNumber });

      if (!car) {
        return res.status(404).json({
          message: 'Car with this license number does not exist!',
          success: false,
        });
      }

      const imagePath = path.join(
        __dirname,
        '..',
        'uploads',
        'carImages',
        car.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      await Car.findOneAndDelete({ licenseNumber });

      return res.status(200).json({
        message: 'Car deleted successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error during car deletion:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },
  updateCar: async (req, res) => {
    try {
      const { licenseNumber } = req.params;

      const car = await Car.findOne({ licenseNumber });

      if (!car) {
        return res.status(404).json({
          message: 'Car with this license number does not exist!',
          success: false,
        });
      }

      const { make, model, year, rentRate, location, description } = req.body;

      const yearNumber = parseInt(year, 10);
      const rentRateNumber = parseFloat(rentRate);

      if (isNaN(yearNumber) || isNaN(rentRateNumber)) {
        return res.status(400).json({
          message: 'Invalid data types for year or rent rate!',
          success: false,
        });
      }

      const updateData = {
        make,
        model,
        year: yearNumber,
        rentRate: rentRateNumber,
        location,
        description,
      };

      if (req.file && req.file.filename) {
        const imagePath = path.join(__dirname, '..', 'uploads', car.image);

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        updateData.image = req.file.filename;
      }

      await Car.findOneAndUpdate({ licenseNumber }, updateData);

      return res.status(200).json({
        message: 'Car updated successfully',
        success: true,
      });
    } catch (error) {
      console.error('Error during car update:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },

  getAllCars: async (req, res) => {
    try {
      const cars = await Car.find();

      if (cars.length === 0) {
        return res.status(404).json({
          message: 'No cars found',
          success: false,
        });
      }

      return res.status(200).json({
        message: 'Cars fetched successfully',
        success: true,
        cars,
      });
    } catch (error) {
      console.error('Error during fetching cars:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },

  getCarByLicenseNumber: async (req, res) => {
    try {
      const { licenseNumber } = req.params;

      const car = await Car.findOne({ licenseNumber });

      if (!car) {
        return res.status(404).json({
          message: 'Car with this license number does not exist!',
          success: false,
        });
      }

      return res.status(200).json({
        message: 'Car fetched successfully',
        success: true,
        car,
      });
    } catch (error) {
      console.error('Error during fetching car:', error);
      return res.status(500).json({
        message: 'Internal server error',
        error: error.message,
        success: false,
      });
    }
  },
};

module.exports = CarController;
