const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    firstName:{type: String, required:true},

    lastName:{type: String, required:true},

    email:{type: String, unique: true, lowercase: true, required:true},

    phoneNumber:{type: String, unique: true},

    password:{type: String, required: true},

    registeredCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"course"
        }
    ]


});

const studentModel = mongoose.model("student", userSchema);

module.exports = studentModel;