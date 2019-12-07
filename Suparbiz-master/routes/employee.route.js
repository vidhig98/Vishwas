const express = require("express");
const router = express.Router();

// Controllers
const employeeController = require("../controllers/employee.controller");

// Middlewares
const { checkToken } = require("../middlewares/token.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

// Routes
router.get(
    "/employees/search",
    checkToken,
    isAuthenticated,
    employeeController.searchEmployees
);

router.get(
    "/employees",
    checkToken,
    isAuthenticated,
    grantAccess("read", "employee"),
    employeeController.getAllEmployees
);

router.get(
    "/employees/:empID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "employee"),
    employeeController.getEmployee
);

router.post(
    "/employees",
    checkToken,
    isAuthenticated,
    grantAccess("create", "employee"),
    employeeController.postEmployee
);

router.put(
    "/employees/:empID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "employee"),
    employeeController.putEmployee
);

router.delete(
    "/employees/:empID",
    checkToken,
    isAuthenticated,
    grantAccess("delete", "employee"),
    employeeController.deleteEmployee
);

module.exports = router;
