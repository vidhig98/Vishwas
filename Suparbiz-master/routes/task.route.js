const express = require("express");
const router = express.Router();

// Controllers
const taskController = require("../controllers/task.controller");

// Middlewares
const { checkToken } = require("../middlewares/token.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/tasks", checkToken, isAuthenticated, taskController.getTasks);

router.get(
    "/tasks/count",
    checkToken,
    isAuthenticated,
    taskController.getTaskCount
);

router.get(
    "/tasks/routine",
    checkToken,
    isAuthenticated,
    taskController.getRoutineTasks
);

router.get(
    "/tasks/special",
    checkToken,
    isAuthenticated,
    taskController.getSpecialTasks
);

router.patch(
    "/tasks/:taskID",
    checkToken,
    isAuthenticated,
    taskController.editTask
);

router.delete(
    "/tasks/:taskID",
    checkToken,
    isAuthenticated,
    taskController.deleteTask
);

router.post("/tasks", checkToken, isAuthenticated, taskController.postTask);

router.post(
    "/tasks/:taskID/comments",
    checkToken,
    isAuthenticated,
    taskController.postTaskComment
);

router.delete(
    "/tasks/:taskID/comments/:commentID",
    checkToken,
    isAuthenticated,
    taskController.deleteTaskComment
);

router.patch(
    "/tasks/:taskID/comments/:commentID",
    checkToken,
    isAuthenticated,
    taskController.editTaskComment
);

module.exports = router;
