const mongoose = require('mongoose')
const validator=require('validator')

const employeeSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate:validator.isEmail
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dept: [{
        type: String,
        required: true
    }],
    roles: [{
        type: String,
        default: "Employee"
    }],
    prevexpirence: [{
        type: String,
        
    }],
    username: [{
        type: String,
        default: "Employee"
    }],
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    empId: {
        type: Number,
        autoIncrement: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema)