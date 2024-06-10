const express = require('express');
const mongoose = require('mongoose');
const Register = require('./models/register');
const app = express();
const cors = require('cors')
const { hashPassword, comparePassword } = require('./helper/auth')

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body
        const user = await Register.findOne({email:email})
        if(!user) {
           return res.status(404).json({ message: "User does not exist" })
        }
        const passwordMatched = await comparePassword(password, user.password)
        if(passwordMatched) {
           return res.status(200).json(user)
        } else {
           return res.status(401).json({ message: 'Incorrect password' })
        }
    } catch (error) {
       return res.status(500).json({ message: error.message })
    }
})

app.post('/register', async(req,res) => {
    try {
        const hashedPassword = await hashPassword(req.body.password)
       const user = await Register.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            country: req.body.country
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://eternalgratis:55555@cluster2.de9snuk.mongodb.net/')
.then(() => {
    app.listen(4000, () => {
        console.log(`This app is running on port 4000`)
    })
    console.log('Database connected successfully')
})