const express = require("express");

require ("./db");

const app = express();

app.use(express.json());

const PORT = 5000;


// Routes
app.use("/api/students", require("./routes/studentRoutes"));

app.use("/api/courses", require("./routes/courseRoutes"));

app.use("/api/scores", require("./routes/scoreRoutes"));

// Default route/ landing page
app.get("/", (req, res) => {
    res.status(200).json({
        message: "School Management API is running"
    });
});

app.listen(PORT, () =>{
    console.log(`App is running on http://localhost:${PORT}`)
})






