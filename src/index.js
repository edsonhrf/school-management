const express = require('express')
const mongoose = require('mongoose');
const app = express()

// config for json files
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// API routes
const personRoutes = require('./app/routes/personRoutes');
app.use('/person', personRoutes)


// connect to database
const DB_USER = 'edsonhrf'
const DB_PASSWORD = encodeURIComponent('wekrQxjH1nyDar37')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fiywgdd.mongodb.net/school_database?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connected successfully!')
        app.listen(5000)
    })
    .catch((err) => console.log(err))