
const Employee=require('../models/Employee')

const bcrypt = require('bcrypt')





const getAllEmployees = async (req, res) => {

const employee = await Employee.find().select('-password').lean()

    
if (!employee?.length) {
    return res.status(400).json({ message: 'No employee found' })
}

res.json(employee)
}



const createNewEmployees =async(req,res)=>{
const {  roles,fname,lname,email,address,phone, department,empId,experience} = req.body

// Confirm data
/*  if (  !Array.isArray(roles) || !roles.length|| !fname|| ! lname|| !email|| !address|| !phone|| !Array.isArray(department)|| ! department.length||!empId) {
    return res.status(400).json({ message: 'All fields are required123' })
}*/

// Check for duplicate username
const duplicate = await Employee.findOne({  fname , lname, empId }).collation({ locale: 'en', strength: 2 }).lean().exec()

if (duplicate) {
    return res.status(409).json({ message: 'Duplicate Employee' })
}



const employeeObject = {roles,fname,lname,email,address,phone, department,empId,experience}



const employee = await Employee.create(employeeObject)

if (employee) { //created 
    res.status(201).json({ message: `New user ${fname} created` })
} else {
    res.status(400).json({ message: 'Invalid user data received' })
}

} 






const updateEmployees =async(req,res)=>{
const { id, roles,fname,lname,email,address,phone,  empId,department} = req.body

if ( !Array.isArray(roles) || !roles.length||/* !fname|| ! lname|| !email|| !address|| !phone||*/ !Array.isArray(department)|| ! department.length/*||!empId*/) {
    return res.status(400).json({ message: 'All fields are required update' })
}

const employee = await Employee.findById(id).exec()

if (!employee) {
    return res.status(400).json({ message: 'User not found' })
}


const duplicate = await Employee.findOne({  fname ,empId }).collation({ locale: 'en', strength: 2 }).lean().exec()


if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' })
}


employee.roles = roles
employee.email=email
// employee.active = active
/* employee.fname = fname

employee.lname = lname
employee.address = address
employee.phone = phone
employee.department = department*/



const updatedEmployee = await employee.save()

res.json({ message: `${updatedEmployee.fname} updated` })

} 

const deleteEmployees =async(req,res)=>{
const { id } = req.body


if (!id) {
    return res.status(400).json({ message: 'User ID Required' })
}




const employee = await Employee.findById(id).exec()

if (!employee) {
    return res.status(400).json({ message: 'User not found' })
}

const result = await employee.deleteOne()

const reply = `Username ${result.fname} with ID ${result._id} deleted`

res.json(reply)

} 



module.exports={getAllEmployees,createNewEmployees,updateEmployees,deleteEmployees}