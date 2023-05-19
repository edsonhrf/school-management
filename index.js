require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// config for json files
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// API routes
const personRoutes = require('./src/app/routes/personRoutes');
app.use('/person', personRoutes)

const studentRoutes = require('./src/app/routes/studentRoutes');
app.use('/student', studentRoutes)

const teacherRoutes = require('./src/app/routes/teacherRoutes');
app.use('/teacher', teacherRoutes)


// connect to database
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fiywgdd.mongodb.net/school_database?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connected successfully!')
        app.listen(5000)
    })
    .catch((err) => console.log(err))