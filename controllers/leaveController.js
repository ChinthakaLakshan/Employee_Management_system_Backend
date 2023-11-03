const Leave = require('../models/Leave');
const User = require('../models/User');

const getAllLeaveRequests = async (req, res) => {
  
    
    try {
      const leaves = await Leave.find();
      res.json(leaves);
  
     
    } catch (error) {
      res.status(500).json({ message: 'Failed to get leaves' });
    }
};

const createLeaveRequest = async (req, res) => {
    try {
      const {userId, leaveType, startDate, endDate, reason } = req.body;
  
      const leaveObject = {userId, leaveType, startDate, endDate, reason };
      const leave = await Leave.create(leaveObject);
     
      res.status(201).json({ message: 'Leave request created', leave });
     
    } catch (error) {
      res.status(500).json({ message: 'Failed to create leave request 123', error });
    }
  };

  const updateLeave = async (req, res) => {
    const { id,  startDate,
      endDate,
      reason,
      approvalStatus } = req.body

    
    if (!id || !approvalStatus) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    
    const leave = await Leave.findById(id).exec()

    if (!leave) {
        return res.status(400).json({ message: 'leave not found' })
    }

    
    const duplicate = await Leave.findOne({reason }).collation({ locale: 'en', strength: 2 }).lean().exec()

    
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate leave title' })
    }

   /* leave.userId=userId */
   leave.startDate=startDate
   leave.endDate=endDate
   leave.reason=reason
   leave.approvalStatus=approvalStatus

    const updatedLeave = await leave.save()

    res.json(`'${updatedLeave.title}' updated`)
}

const deleteLeave = async (req, res) => {
  const { id } = req.body

  
  if (!id) {
      return res.status(400).json({ message: 'Leave ID required' })
  }

   
  const leave = await Leave.findById(id)

  if (!leave) {
      return res.status(400).json({ message: 'Leave not found' })
  }

  const result = await leave.deleteOne()

  const reply = `Leave '${result.title}' with ID ${result._id} deleted`

  res.json(reply)
}









 



module.exports ={ getAllLeaveRequests ,updateLeave, createLeaveRequest ,deleteLeave };