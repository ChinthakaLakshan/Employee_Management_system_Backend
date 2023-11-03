const mongoose = require('mongoose');
const validator = require('validator');

// Custom validation functions
const isAlphaNumeric = (value) => /^[a-zA-Z0-9]+$/.test(value);
const isPhoneNumber = (value) => /^[0-9]{10}$/.test(value);
const isAlphaOnly = (value) => /^[a-zA-Z]+$/.test(value);

const employeeSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    validate: {
      validator: isAlphaOnly,
      message: 'First name should contain only letters.'
    }
  },
  lname: {
    type: String,
    required: true,
    validate: {
      validator: isAlphaOnly,
      message: 'Last name should contain only letters.'
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format.'
    }
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String, 
    required: true,
    validate: {
      validator: isPhoneNumber,
      message: 'Phone number should contain exactly 10 digits.'
    }
  },
  department: [{
    type: String,
    //required: true
  }],
  roles: [{
    type: String,
    default: 'Employee'
  }],
 experience: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  empId: {
    type: String,
    required: true,
    validate: {
      validator: isAlphaNumeric,
      message: 'Employee ID should contain only letters and numbers.'
    }
  },
  assignedTasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

module.exports = mongoose.model('Employee', employeeSchema);
