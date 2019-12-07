const express = require("express");
const router = express.Router({ mergeParams: true });

// Controllers
const attendanceController = require("../controllers/attendance.controller");

// Middlewares
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { checkToken } = require("../middlewares/token.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

router.get(
    "/attendance",
    checkToken,
    isAuthenticated,
    grantAccess("read", "attendance"),
    attendanceController.getAllUsersAttendance
);

router.post(
    "/:userID/attendance",
    checkToken,
    isAuthenticated,
    grantAccess("read", "attendance"),
    attendanceController.getUserMonthlyAttendance
);

router.patch(
    "/:userID/attendance",
    checkToken,
    isAuthenticated,
    grantAccess("update", "attendance"),
    attendanceController.patchSingleUserAttendance
);

router.post(
    "/attendance",
    checkToken,
    isAuthenticated,
    grantAccess("create", "attendance"),
    attendanceController.postAllUsersAttendance
);

module.exports = router;
