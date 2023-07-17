const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  image: { type: String, default: null },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
