const  mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseTitle:{type: String, required: true},

    courseCode:{type: String, required: true},

    description:{type: String},

    registeredStudents:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }
    ]
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;