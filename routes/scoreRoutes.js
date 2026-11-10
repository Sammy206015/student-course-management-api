const express = require("express");

const router = express.Router();

const {createScore, getStudentScores} = require("../controllers/scoreController");

router.post("/create-score", createScore);

router.get("/student/:id", getStudentScores);

module.exports = router;