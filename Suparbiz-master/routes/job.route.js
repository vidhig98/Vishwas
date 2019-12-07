const express = require("express");
const router = express.Router();

// Controllers
const jobController = require("../controllers/job.controller");

// Middlewares
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { checkToken } = require("../middlewares/token.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

router.get(
    "/jobs",
    checkToken,
    isAuthenticated,
    grantAccess("read", "job"),
    jobController.getJobs
);

router.get(
    "/jobs/:jobID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "job"),
    jobController.getJob
);

router.post(
    "/jobs",
    checkToken,
    isAuthenticated,
    grantAccess("create", "job"),
    jobController.postJob
);

router.put(
    "/jobs/:jobID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "job"),
    jobController.putJob
);

router.get(
    "/organizations/:organizationID/jobs",
    checkToken,
    isAuthenticated,
    grantAccess("read", "job"),
    jobController.getOrganizationJobs
);

module.exports = router;
