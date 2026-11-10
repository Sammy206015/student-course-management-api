const courseModel = require("../models/coursesModel");
const studentModel = require("../models/studentsModel");

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const data = {
            courseTitle: req.body.courseTitle,
            courseCode: req.body.courseCode,
            description: req.body.description
        };

        const existingCourse = await courseModel.findOne({ courseCode: req.body.courseCode });

        if (existingCourse) {
            return res.status(409).json({
                message: "Course code already exists"
            });
        }

        const createdCourse = await courseModel.create(data);

        res.status(201).json({
            message: "Course created successfully",
            data: createdCourse
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating Course",
            error: error.message
        });
    }
};


exports.registerStudentForCourse = async (req, res) => {
    try {
        // Get IDs from request body
        const studentId = req.body.studentId;
        const courseId = req.body.courseId;

        // Find student
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Find course
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check if student is already registered
        if (
            student.registeredCourses.some(
                id => id.equals(course._id)
            )
        ) {
            return res.status(409).json({
                message: "Student is already registered for this course"
            });
        }

        // Add course to student's registeredCourses
        student.registeredCourses.push(course._id);

        // Add student to course's registeredStudents
        course.registeredStudents.push(student._id);

        await student.save();
        await course.save();

        res.status(200).json({
            message: "Student successfully registered for course"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error registering student for course",
            error: error.message
        });
    }
};



// Get a course with registered students using populate()
exports.getCourseStudents = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id)
            .populate("registeredStudents", "-password");

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course retrieved successfully",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving this course",
            error: error.message
        });
    }
};