const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth.controller");

// Middlewares
const Validators = require("../middlewares/validators.middleware");

// auth/login
router.get("/login", authController.getLogin);
router.post("/login", Validators.validateLogin, authController.postLogin);

module.exports = router;
