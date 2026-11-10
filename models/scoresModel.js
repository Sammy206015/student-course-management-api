const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({

    student: {type: mongoose.Schema.Types.ObjectId, ref: "student", required: true},

    course: {type: mongoose.Schema.Types.ObjectId, ref: "course", required: true},

    caScore: {type: Number, required: true, min: 0, max: 40},

    examScore: {type: Number, required: true, min: 0, max: 60},

    totalScore: {type: Number, required: true}

});

scoreSchema.index(
    { student: 1, course: 1 },
    { unique: true }
);

const scoreModel = mongoose.model("score", scoreSchema);

module.exports = scoreModel;