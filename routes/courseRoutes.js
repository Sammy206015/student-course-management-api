const express = require("express");

const router = express.Router();

const {createCourse, registerStudentForCourse, getCourseStudents} = require("../controllers/courseController");

router.post("/create-course", createCourse);

router.post("/register-course", registerStudentForCourse);

router.get("/:id/students", getCourseStudents);

module.exports = router;