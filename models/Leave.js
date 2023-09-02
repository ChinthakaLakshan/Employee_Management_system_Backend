const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: {
        type: String
       /*  required: true,
        ref: 'User' */

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
    type: [String],
        default: ["Pending"] 
  }
});


module.exports = mongoose.model('Leave',leaveSchema)