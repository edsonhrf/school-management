const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/TeacherController');
const checkToken = require('../middlewares/checkToken');

// login
router.post("/auth/login", teacherController.teacherLogin);

// create
router.post("/", teacherController.createTeacher);

// read
router.get("/", checkToken, teacherController.getTeachers);

// read by id
router.get("/:id", teacherController.getTeacher);

// update all object
router.put("/:id", teacherController.updateTeacher);

// delete
router.delete("/:id", teacherController.deleteTeacher);

//update password
router.patch('/updatePassword/:id', teacherController.updatePassword);

module.exports = router;