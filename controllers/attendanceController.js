const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');


  
  
    const getAllAttendances= async (req, res)=> {
    try {
      const attendances = await Attendance.find()
      res.json(attendances);
    
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve attendance records' });
    }
  }

  const addAttendance = async (req, res) => {
    try {
     const { empId, date, timeIn, timeOut } = req.body;
  
    
  const attendance = new Attendance({
    empId,
    date,
    timeIn,
    timeOut
    
  });

  await attendance.save();

  
  if (attendance) { //created 
    res.status(201).json({ message: `New user ${empId} created` })
} else {
    res.status(400).json({ message: 'Invalid user data received' })
}
  
      
    } catch (error) {
      res.status(500).json({ message: 'Failed to add attendance record' });
    }
  };


  



  const  updateAttendance=async(req, res)=> {
    try {
      const {  _id, date, timeIn, timeOut } = req.body;

      // Check if attendance record exists
      const attendance = await Attendance.findById(empId);
      if (!attendance) {
        return res.status(400).json({ message: 'Attendance record not found' });
      }

  

      // Update attendance record

      attendance.date = date;
      attendance.timeIn = timeIn;
      attendance.timeOut = timeOut;

      await attendance.save();

      res.json({ message: 'Attendance record updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update attendance record' });
    }
  }


module.exports = {getAllAttendances,updateAttendance,addAttendance};