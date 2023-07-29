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
      const {username, leaveType, startDate, endDate, reason } = req.body;
  
      const leaveObject = { username, leaveType, startDate, endDate, reason };
      const leave = await Leave.create(leaveObject);
     
      res.status(201).json({ message: 'Leave request created', leave });
     
    } catch (error) {
      res.status(500).json({ message: 'Failed to create leave request 123', error });
    }
  };
  const acceptLeaveRequest = async (req, res) => {
    try {
      const { leaveId } = req.params;
  
      // Find the leave request by ID
      const leaveRequest = await Leave.findById(leaveId);
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      // Update the approvalStatus to true (accepted)
      leaveRequest.approvalStatus = true;
  
      // Save the updated leave request
      const updatedLeaveRequest = await leaveRequest.save();
  
      res.json({ message: 'Leave request accepted', leaveRequest: updatedLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Failed to accept leave request', error });
    }
  };
  const cancelLeaveRequest = async (req, res) => {
    try {
      const { leaveId } = req.params;
  
      // Find the leave request by ID
      const leaveRequest = await Leave.findById(leaveId);
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      // Delete the leave request
      await leaveRequest.deleteOne();
  
      res.json({ message: 'Leave request canceled', leaveId });
    } catch (error) {
      res.status(500).json({ message: 'Failed to cancel leave request', error });
    }
  };


  const approveLeaveRequest = async (req, res) => {
    try {
      const { leaveId } = req.params;
  
      // Find the leave request by ID
      const leaveRequest = await Leave.findById(leaveId);
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      // Update the approvalStatus to "approved"
      leaveRequest.approvalStatus = 'approved';
  
      // Save the updated leave request
      const updatedLeaveRequest = await leaveRequest.save();
  
      res.json({ message: 'Leave request approved', leaveRequest: updatedLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Failed to approve leave request', error });
    }
  };

  const cancelLeaveRequest2 = async (req, res) => {
    try {
      const { leaveId } = req.params;
  
      // Find the leave request by ID
      const leaveRequest = await Leave.findById(leaveId);
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      // Update the approvalStatus to "canceled"
      leaveRequest.approvalStatus = 'canceled';
  
      // Save the updated leave request
      const updatedLeaveRequest = await leaveRequest.save();
  
      res.json({ message: 'Leave request canceled', leaveRequest: updatedLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Failed to cancel leave request', error });
    }
  };
  



module.exports ={ getAllLeaveRequests , createLeaveRequest ,acceptLeaveRequest , cancelLeaveRequest , approveLeaveRequest , cancelLeaveRequest2};