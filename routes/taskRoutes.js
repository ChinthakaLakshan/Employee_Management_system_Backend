
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
//const verifyJWT = require('../middleware/verifyJWT');

//router.use(verifyJWT);

router.route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createNewTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);


  
module.exports = router;