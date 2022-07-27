const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User.js')

// http://localhost:5000/api/auth

// @router POST api/auth/register
// @desc Register user 
// @access public
router.post('/register', async(req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
    }
    try {
        // Check for existing user
        const user = await User.findOne({ username: username })
        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Username already exists' })

        // All good
        const hashPassword = await argon2.hash(password)
        const newUser = new User({
            username: username,
            password: hashPassword
        })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User created successfully', accessToken })

    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
})



// @router POST api/auth/login
// @desc Login user
// @access public
router.post('/login', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
    }

    try {
        // Check for existing username
        const user = await User.findOne({ username: username })
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username ' })

        // Username found then check password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect  password' })

        // All good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Login successfully', accessToken })

    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router