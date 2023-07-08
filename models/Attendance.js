const mongoose = require('mongoose')
const validator=require('validator')

const employeeAttendanceSchema = new mongoose.Schema({

empId:{
 
   type: String,
    
    required: true
  },
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
}

})

module.exports = mongoose.model('Attendance', employeeAttendanceSchema)














