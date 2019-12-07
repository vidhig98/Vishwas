require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000;

const dbServer =
    process.env.NODE_ENV == "development"
        ? `mongodb://localhost:27017/suparbiz`
        : `mongodb://${process.env.DB_SERVER}:27017/suparbiz`;

mongoose.connect(
    dbServer,
    {
        useNewUrlParser: true
    },
    error => {
        if (!error) {
            console.log("MongoDB Server Connection Established");
        } else {
            console.log(`MongoError: ${error}`);
        }
    }
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: true,
    credentials: true
};
app.use(cors(corsOptions));

// Route Imports

const authRoutes = require("./routes/auth.route");
const attendanceRoutes = require("./routes/attendance.route");
const crmRoutes = require("./routes/crm.route");
const departmentRoutes = require("./routes/department.route");
const employeeRoutes = require("./routes/employee.route");
const jobRoutes = require("./routes/job.route");
const taskRoutes = require("./routes/task.route");
const workerRoutes = require("./routes/worker.route");
const inventoryRoutes = require("./routes/inventory.route");

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Routes
app.use("/auth", authRoutes);
app.use("/crm", crmRoutes);
app.use("/users", attendanceRoutes);
app.use(departmentRoutes);
app.use(employeeRoutes);
app.use(jobRoutes);
app.use(taskRoutes);
app.use(workerRoutes);
app.use(inventoryRoutes);

// Default Route
app.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});
