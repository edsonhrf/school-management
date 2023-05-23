const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');
const checkToken = require('../middlewares/checkToken');

// login
router.post("/auth/login", studentController.studentLogin);

// create
router.post("/", studentController.createStudent);

// read
router.get("/", checkToken, studentController.getStudents);

// read by id
router.get("/:id", studentController.getStudent);

// update all object
router.put("/:id", studentController.updateStudent);

// delete
router.delete("/:id", studentController.deleteStudent);

//update password
router.patch('/updatePassword/:id', studentController.updatePassword);

module.exports = router;
