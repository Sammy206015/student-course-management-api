
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("Connected to MongoDB Successfully");
        })
        .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
        });

