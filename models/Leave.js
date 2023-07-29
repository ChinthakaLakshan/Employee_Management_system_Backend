const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  username: {
        type: mongoose.Schema.Types.ObjectId,
        /* required: true, */
        ref: 'User'

      },
  leaveType: {
    type: String,
    required: true
  },
 startDate: {
    type: Date
  },
  
  endDate: {
    type: Date
  },
  reason :{
    type:String,
    default : false
  },
  approvalStatus:{
    type: String, 
    default: "pending"
  }
});


module.exports = mongoose.model('Leave',leaveSchema)