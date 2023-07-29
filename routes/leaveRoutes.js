const express = require('express');
const router = express.Router();

const leaveController =require('../controllers/leaveController');


router.route('/')

.get(leaveController.getAllLeaveRequests)
.post(leaveController.createLeaveRequest)


router.route('/:id')
.put(leaveController.acceptLeaveRequest)
.patch(leaveController.cancelLeaveRequest)


router.route('/:id/approve')
.put(leaveController.approveLeaveRequest);

router.route('/:id/cancel')
 .put(leaveController.cancelLeaveRequest2);


 router.put('/:id/approve', leaveController.approveLeaveRequest);
 router.put('/:id/cancel', leaveController.cancelLeaveRequest2);

module.exports = router;



