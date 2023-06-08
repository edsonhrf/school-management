require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger/swagger.json");
const employeeRegistrationRoutes = require("./src/app/routes/employeeRegistrationRoutes");
const userRegistrationRoutes = require("./src/app/routes/userRegistrationRoutes");
const studentRoutes = require("./src/app/routes/studentRoutes");
const teacherRoutes = require("./src/app/routes/teacherRoutes");
const db = require("./src/database/db");
const cors = require("cors");

const app = express();

//CORS policy
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// config for json files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public route - Home Page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Home Page!" });
});

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Private routes
app.use("/employee", employeeRegistrationRoutes);

app.use("/user", userRegistrationRoutes);

app.use("/student", studentRoutes);

app.use("/teacher", teacherRoutes);

// connect to database
db.connectToDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => console.log(err));
