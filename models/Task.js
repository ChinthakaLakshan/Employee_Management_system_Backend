const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  selectedEmployees: {
        type: [String]
        //default: ["lakshan"] 

       
      },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  status:{
    type:Boolean,
    default : false
  }
});


module.exports = mongoose.model('Task', taskSchema)