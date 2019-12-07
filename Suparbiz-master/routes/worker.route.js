const express = require("express");
const router = express.Router();

// Controllers
const workerController = require("../controllers/worker.controller");

// Middlewares

// Routes
router.get("/workers", workerController.getAllWorkers);
router.get("/workers/:workerID", workerController.getWorker);
router.post("/workers", workerController.postWorker);
// router.patch("/worker/:workerID");
router.delete("/workers/:workerID", workerController.deleteWorker);

module.exports = router;
