const express = require('express')
const router = express.Router()
const employeeController=require('../controllers/employeeController')

const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
.get(employeeController.getAllEmployees)
.post(employeeController.createNewEmployees)
.patch(employeeController.updateEmployees)
.delete(employeeController.deleteEmployees)


module.exports=router