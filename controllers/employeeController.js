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
    const { username, password, roles,fname,lname,email,address,phone, dept,empId} = req.body

    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length|| !fname|| ! lname|| !email|| !address|| !phone|| !Array.isArray(dept)|| ! dept.length) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await Employee.findOne({ username,fname,lname,email,address,phone }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Employee' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles,fname,lname,email,address,phone, dept ,empId}

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
  
    
} )
// @desc delete users
// @route delete/users
// @access Private

const deleteEmployees =asyncHandler(async(req,res)=>{
    
} )



module.exports={getAllEmployees,createNewEmployees,updateEmployees,deleteEmployees}