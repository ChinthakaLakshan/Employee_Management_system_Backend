const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  selectedEmployees:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    
   

       
      }],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startDatet: {
    
    
  },
  timeOut: {
    type: Date,
  
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type:[String],
    default : ['Ongoing']
  }
});


module.exports = mongoose.model('Task', taskSchema)