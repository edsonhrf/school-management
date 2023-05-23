require("dotenv").config();
const express = require("express");
const personRoutes = require("./src/app/routes/personRoutes");
const db = require("./src/database/db");

const app = express();

// config for json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public route - Home Page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Home Page!" });
});

// Private routes
app.use("/person", personRoutes);

// const studentRoutes = require('./src/app/routes/studentRoutes');
// app.use('/student', studentRoutes)

// const teacherRoutes = require('./src/app/routes/teacherRoutes');
// app.use('/teacher', teacherRoutes)

// connect to database
db.connectToDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
