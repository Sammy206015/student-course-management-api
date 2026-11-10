const scoreModel = require("../models/scoresModel");
const studentModel = require("../models/studentsModel");
const courseModel = require("../models/coursesModel");

// Create or manage a student's score
exports.createScore = async (req, res) => {
    try {
        const {
            studentId,
            courseId,
            caScore,
            examScore
        } = req.body;

        // Validate student
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Validate course
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check course registration
        if (!student.registeredCourses.includes(course._id)) {
            return res.status(400).json({
                message: "Student is not registered for this course"
            });
        }

        // Validate scores
        if (
            typeof caScore !== "number" ||
            typeof examScore !== "number" ||
            !Number.isFinite(caScore) ||
            !Number.isFinite(examScore) ||
            caScore < 0 ||
            caScore > 40 ||
            examScore < 0 ||
            examScore > 60
        ) {
            return res.status(400).json({
                message: "CA Score must be 0-40 and examination Score must be 0-60"
            });
        }

        const totalScore = caScore + examScore;

        const score = await scoreModel.create({
            student: studentId,
            course: courseId,
            caScore,
            examScore,
            totalScore
        });

        res.status(201).json({
            message: "Score recorded successfully",
            score
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Score already exists for this student and course"
            });
        }

        res.status(500).json({
            message: "Error creating Score",
            error: error.message
        });
    }
};


// Retrieve a student's scores alongside course details
exports.getStudentScores = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
            .select("-password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const scores = await scoreModel.find({
            student: req.params.id
        })
            .populate("student", "firstName lastName email")
            .populate("course", "courseTitle courseCode description");

        res.status(200).json({
            message: "Student scores retrieved successfully",
            student,
            scores
        });

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving student's score",
            error: error.message
        });
    }
};