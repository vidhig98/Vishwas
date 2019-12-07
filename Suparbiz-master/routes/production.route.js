const express = require("express");
const router = express.Router();

// Controllers
const productionController = require("../controllers/production.controller");

// Middlewares
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { checkToken } = require("../middlewares/token.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

router.get(
    "/productions",
    checkToken,
    isAuthenticated,
    grantAccess("read", "production"),
    productionController.getProductions
);

router.get(
    "/productions/:productionID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "production"),
    productionController.getProduction
);

router.post(
    "/productions",
    checkToken,
    isAuthenticated,
    grantAccess("create", "production"),
    productionController.postProduction
);

router.put(
    "/productions/:productionID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "production"),
    productionController.putProduction
);

router.get(
    "/organizations/:organizationID/productions",
    checkToken,
    isAuthenticated,
    grantAccess("read", "job"),
    productionController.getOrganizationProductions
);

module.exports = router;
