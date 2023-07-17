const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const fileUpload = require('express-fileupload');

router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(fileUpload({}), employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
