const express = require("express");
const router = express.Router();

// Controllers
const departmentController = require("../controllers/department.controller");

// Middlewares
const { checkToken } = require("../middlewares/token.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

// Routes
router.get(
    "/departments",
    checkToken,
    isAuthenticated,
    grantAccess("read", "department"),
    departmentController.getAllDepartments
);

router.get(
    "/departments/:departmentName/employees",
    checkToken,
    isAuthenticated,
    grantAccess("read", "employee"),
    departmentController.getDepartmentEmployees
);

module.exports = router;
