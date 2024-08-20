const mongoose = require('mongoose');

const connectTomongoose = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log('mongoose connected successfully');
    })
    .catch((error) => {
      console.log('mongoose connection failed', error);
    });
};
module.exports = connectTomongoose;
