const Task = require('../models/Task');
const Employee=require('../models/Employee');
const User = require('../models/User');


const getAllTasks = async (req, res) => {
const tasks = await Task.find().lean()
res.json(tasks);
};


const createNewTask = async (req, res) => {
    try {
      const { selectedEmployees, title, description , startDatet,timeOut } = req.body;
      
      
  
      const taskObject = { selectedEmployees, title, description , startDatet,timeOut};
      const task = await Task.create(taskObject);
  
      res.status(201).json({ message: 'Task created', task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to create task' });
    }
  };
  

  const updateTask = async (req, res) => {
    try {
      const { id, selectedEmployees, title, description, status , startDatet,timeOut} = req.body;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.selectedEmployees = selectedEmployees;
      task.title = title;
      task.description = description;
      task.status = status;
      task.startDatet=startDatet;
      task.timeOut=timeOut;
      await task.save();
      res.json({ message: 'Task updated', task });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update task' });
    }
  };
  

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne();
    res.json({ message: 'Task deleted', taskId: id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

module.exports = { getAllTasks, createNewTask, updateTask, deleteTask };