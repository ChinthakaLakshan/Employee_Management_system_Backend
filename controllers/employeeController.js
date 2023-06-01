//const User=require('../models/User')
const Employee=require('../models/Employee')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



// @desc Get all users
// @route GET /users
// @access Private

const getAllEmployees = asyncHandler(async (_req, res) => {
    // Get all users from MongoDB
    const employee = await Employee.find().select('-password').lean()

    // If no users 
    if (!employee?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(employee)
})

// @desc create users
// @route POST /users
// @access Private

const createNewEmployees =asyncHandler(async(req,res)=>{
    const { username, password, roles,fname,lname,email,address,phone, dept,empId,prevexpirence} = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length|| !fname|| ! lname|| !email|| !address|| !phone|| !Array.isArray(dept)|| ! dept.length||!empId) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await Employee.findOne({ username,fname,lname,email,address,phone }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Employee' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles,fname,lname,email,address,phone, dept ,empId,prevexpirence}

    // Create and store new user 
    const employee = await Employee.create(userObject)

    if (employee) { //created 
        res.status(201).json({ message: `New user ${fname} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
   
} )

// @descupdate users
// @route Patch /users
// @access Private

const updateEmployees =asyncHandler(async(req,res)=>{
    const { id,username, password, roles,fname,lname,email,address,phone, dept, empId} = req.body

    if (!username || !password || !Array.isArray(roles) || !roles.length|| !fname|| ! lname|| !email|| !address|| !phone|| !Array.isArray(dept)|| ! dept.length||!empId) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const employee = await Employee.findById(id).exec()

    if (!employee) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await Employee.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    employee.username = username
    employee.roles = roles
   // employee.active = active
   employee.fname = fname
   employee.username = username
   employee.lname = lname
   employee.address = address
   employee.phone = phone
   employee.dept = dept
   



    if (password) {
        // Hash password 
         employee.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedEmployee = await employee.save()

    res.json({ message: `${updatedEmployee.username} updated` })
    
} )
// @desc delete users
// @route delete/users
// @access Private

const deleteEmployees =asyncHandler(async(req,res)=>{
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

  

    // Does the user exist to delete?
    const emloyee = await Employee.findById(id).exec()

    if (!emloyee) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await emloyee.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
    
} )



module.exports={getAllEmployees,createNewEmployees,updateEmployees,deleteEmployees}