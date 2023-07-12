const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

  
  
    const getAllAttendances= async (req, res)=> {
    try {
      const attendance = await Attendance.find({}, '   -__v')
      res.json(attendance);
    
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve attendance records' });
    }
  }

  const addAttendance = async (req, res) => {
    try {
     const { empId,  date, timeIn, timeOut } = req.body;
    
    
  const attendance = new Attendance({
    empId,
    date,
    timeIn,
    timeOut
    
  });

  const savedAttendance = await attendance.save();

    if (savedAttendance) {
      res.status(201).json({ message: `New attendance record created` });
    } else {
      res.status(400).json({ message: 'Failed to create attendance record' });
    }
  } catch (error) 
  {
    console.error('Error adding attendance record:', error);
    res.status(500).json({ message: 'Failed to add attendance record', error });
  }
};



  const  updateAttendance=async(req, res)=> {
    try {
      const { id ,empId, date, timeIn, timeOut} = req.body;

      // Check if attendance record exists
      const attendance = await Attendance.findById(id).exec();
      if (!attendance) {
        return res.status(400).json({ message: 'Attendance record not found' });
      }

  

      // Update attendance record
      attendance.empId =empId;
      attendance.date = date;
      attendance.timeIn = timeIn;
      attendance.timeOut = timeOut;

      await attendance.save();

      res.json({ message: 'Attendance record updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update attendance record' });
    }
  }

  const deleteAttendance = async (req, res) => {
    try {
      const { id } = req.body;
  
      // Check if attendance record exists
      const attendance = await Attendance.findById(id);
      if (!attendance) {
        return res.status(404).json({ message: 'Attendance record not found' });
      }
  
      // Delete attendance record
      await attendance.deleteOne()
  
      res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete attendance record' });
    }
  };


module.exports = {getAllAttendances,updateAttendance,addAttendance,deleteAttendance};