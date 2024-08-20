const express = require('express');
const CarController = require('../Controller/CarController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), CarController.uploadCar);
router.delete('/delete/:licenseNumber', CarController.deleteCar); // Updated to use URL param
router.put('/edit/:licenseNumber', CarController.updateCar); // Corrected function name
router.get('/getAll', CarController.getAllCars);
router.get('/getBylicence/:licenseNumber', CarController.getCarByLicenseNumber);

module.exports = router;
