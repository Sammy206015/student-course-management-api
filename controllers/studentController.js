const studentModel = require("../models/studentsModel");
const bcrypt = require("bcryptjs");

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        } = req.body;

        const existingStudent = await studentModel.findOne({ email: req.body.email});

        const checkPhoneNumber = await studentModel.findOne({phoneNumber: req.body.phoneNumber});

        if (existingStudent || checkPhoneNumber) {
            return res.status(409).json({
                message: "Student already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await studentModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Student registered successfully",
            student: {
                id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                phoneNumber: student.phoneNumber
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating student",
            error: error.message
        });
    }
};


// Get a student with registered courses using populate()
exports.getStudentCourses = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
            // .select("-password") this excludes the user password from been retrieve from the database
            .select("-password")
            .populate("registeredCourses");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student retrieved successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Error getting student courses",
            error: error.message
        });
    }
};