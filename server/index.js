const express = require('express')
const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://linhnk:linhnk@express-mongodb-learnit.ott5z.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))