const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CompanyDB');
    console.log(`db connect! )`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDb;
