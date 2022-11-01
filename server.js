const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/connectDB.JS')
const app = express()
const user = require("./models/user");
const port = 4000
require('dotenv').config();
connectDB();

app.use(express.json());

//  GET :  RETURN ALL USERS 
app.get('/', async (req, res) => {
    try {
        const data = await User.find()
        await res.send(data)
    }catch (err) {console.log(err.message)}
})


//   POST :  ADD A NEW USER TO THE DATABASE 
app.post('/add', async (req, res) => {
    try {
        const newUser =  new User ({
            name : req.body.name,
            age : req.body.age,
            email : req.body.email
        })
        await newUser.save((err, result) => {
            if (err) {console.log(err.message);}
            if (result) {console.log('user added successfully');}
        })
    }catch (err) {console.log(err.message)}
})

//  PUT : EDIT A USER BY ID 
app.put('/edit/:id', async (req,res) => {
    try {
        User.findByIdAndUpdate({ _id : req.params.id}, { name : req.body.name}, (err,result) => {
            if (err) {console.log(err.message)}
            if (result) {console.log('updated successfully')}
        })
    }catch (err) {console.log(err.message);}
})

//  DELETE : REMOVE A USER BY ID 
app.delete('/delete/:id', async (req, res) => {
    try {
        User.findByIdAndDelete({_id : req.params.id}, (err,result) => {
            if (err) {console.log(err.message);}
            if (result) {console.log('deleted successfully');}
        })
    }catch (err) {console.log(err.message)}
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))