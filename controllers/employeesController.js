const Employee = require('../model/Employee');
const { v4: uuid } = require('uuid');
const path = require('path');

const getAllEmployees = async (req, res) => {
  console.log(req.cookies);
  console.log(req.headers);

  res.json(await Employee.find());
};

const createNewEmployee = async (req, res) => {
  const newEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: 'First and last names are required.' });
  }

  const employee = new Employee(newEmployee);
  await employee.save();
  res.status(201).json(employee);
};

const updateEmployee = async (req, res) => {
  const { id, firstname, lastname } = req.body;
  const fileName = uuid() + '.jpg';
  const filePath = path.resolve('files', fileName);
  console.log(`req`, req);
  req.files.file.mv(filePath);
  const employee = await Employee.findOne({ _id: id });
  employee.firstname = firstname;
  employee.lastname = lastname;
  employee.image = `http://localhost:3500/` + fileName;
  await employee.save();
  res.json(employee);
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.find({ _id: req.body.id });

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }

  const employeeDeleted = await Employee.deleteOne(employee._id);
  console.log(`employeeDeleted`, employeeDeleted);
  res.json(employee[0]);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
