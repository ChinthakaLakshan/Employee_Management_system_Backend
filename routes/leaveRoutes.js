const express = require('express');
const router = express.Router();

const leaveController =require('../controllers/leaveController');
const verifyJWT = require('../middleware/verifyJWT');
router.use(verifyJWT);

router.route('/')

.get(leaveController.getAllLeaveRequests)
.post(leaveController.createLeaveRequest)
.patch(leaveController.updateLeave)
.delete(leaveController.deleteLeave)




module.exports = router;



