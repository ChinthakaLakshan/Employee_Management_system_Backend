const mongoose = require('mongoose')
const validator=require('validator')
const Employee = require('./Employee')

const employeeAttendanceSchema = new mongoose.Schema({

empId:[{
 
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
  }],
  date: {
    type: Date,
    required: true
  },
  timeIn: {
    type: Date,
    required: true
  },
  timeOut: {
    type: Date,
    required: true
} ,
/* fname: {
  type: Date,
  required: true
} */

})

module.exports = mongoose.model('Attendance', employeeAttendanceSchema)














