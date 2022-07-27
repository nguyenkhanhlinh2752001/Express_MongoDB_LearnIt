require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const authRouter = require('./routes/auth.js')

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@express-mongodb-learnit.ott5z.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected successfully❤️ ')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}💚`))