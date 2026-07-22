const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");//user
const path = require("path");
const dsaRoutes = require("./routes/dsaRoutes");
const plannerRoutes = require("./routes/plannerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


app.use(express.json());
app.use("/dsa", dsaRoutes);
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);
app.get("/api", (req, res) => {
    res.send("AI Placement Coach Backend Running 🚀");
});
app.use("/planner", plannerRoutes);
app.use("/dashboard", dashboardRoutes);

module.exports = app;