const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controllers/user.controller");

// Middlewares
const { checkToken } = require("../middlewares/token.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");

// Child Routes
const attendanceRoutes = require("../routes/attendance.route");

router.get(
    "/users/profile",
    checkToken,
    isAuthenticated,
    userController.getUserProfile
);

router.get("/users", checkToken, isAuthenticated, userController.getUsers);

router.use("/users", attendanceRoutes);

module.exports = router;
