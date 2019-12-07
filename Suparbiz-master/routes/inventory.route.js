const express = require("express");
const router = express.Router();

// Controllers
const inventoryController = require("../controllers/inventory.controller");

// Middlewares
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { checkToken } = require("../middlewares/token.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

router.get(
    "/inventorys",
    checkToken,
    isAuthenticated,
    grantAccess("read", "inventory"),
    inventoryController.getInventorys
);

router.get(
    "/inventorys/:inventoryID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "inventory"),
    inventoryController.getInventory
);

router.post(
    "/inventorys",
    checkToken,
    isAuthenticated,
    grantAccess("create", "inventory"),
    inventoryController.postInventory
);

router.put(
    "/inventorys/:inventoryID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "inventory"),
    inventoryController.putInventory
);

router.get(
    "/organizations/:organizationID/inventorys",
    checkToken,
    isAuthenticated,
    grantAccess("read", "job"),
    inventoryController.getOrganizationInventorys
);

module.exports = router;
