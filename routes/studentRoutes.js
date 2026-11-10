const express = require("express");

const router = express.Router();

const {registerStudent, getStudentCourses} = require("../controllers/studentController");

router.post("/register", registerStudent);

router.get("/:id/courses", getStudentCourses);

module.exports = router;