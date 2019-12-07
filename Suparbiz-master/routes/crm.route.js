const express = require("express");
const router = express.Router();

// Controllers
const crmController = require("../controllers/crm.controller");

// Middlewares
const { checkToken } = require("../middlewares/token.middleware");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { grantAccess } = require("../middlewares/access-control.middleware");

router.get(
    "/leads",
    checkToken,
    isAuthenticated,
    grantAccess("read", "lead"),
    crmController.getLeads
);

router.get(
    "/leads/:leadID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "lead"),
    crmController.getLead
);

router.get(
    "/leads/:leadID/comments",
    checkToken,
    isAuthenticated,
    grantAccess("read", "leadComment"),
    crmController.getLeadComments
);

router.get(
    "/customers",
    checkToken,
    isAuthenticated,
    grantAccess("read", "customer"),
    crmController.getCustomers
);

router.get(
    "/customers/:customerID",
    checkToken,
    isAuthenticated,
    grantAccess("read", "customer"),
    crmController.getCustomer
);

router.get(
    "/customers/:customerID/comments",
    checkToken,
    isAuthenticated,
    grantAccess("read", "customerComment"),
    crmController.getCustomerComments
);

router.post(
    "/leads",
    checkToken,
    isAuthenticated,
    grantAccess("create", "lead"),
    crmController.postLead
);

router.post(
    "/customers",
    checkToken,
    isAuthenticated,
    grantAccess("create", "customer"),
    crmController.postCustomer
);

router.put(
    "/leads/:leadID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "lead"),
    crmController.putLead
);

router.put(
    "/customers/:customerID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "customer"),
    crmController.putCustomer
);

router.post(
    "/leads/:leadID/comments",
    checkToken,
    isAuthenticated,
    grantAccess("create", "leadComment"),
    crmController.postLeadComment
);

router.delete(
    "/leads/:leadID/comments/:commentID",
    checkToken,
    isAuthenticated,
    grantAccess("delete", "leadComment"),
    crmController.deleteLeadComment
);

router.patch(
    "/leads/:leadID/comments/:commentID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "leadComment"),
    crmController.editLeadComment
);

router.post(
    "/customers/:customerID/comments",
    checkToken,
    isAuthenticated,
    grantAccess("create", "customerComment"),
    crmController.postCustomerComment
);

router.delete(
    "/customers/:customerID/comments/:commentID",
    checkToken,
    isAuthenticated,
    grantAccess("delete", "customerComment"),
    crmController.deleteCustomerComment
);

router.patch(
    "/customers/:customerID/comments/:commentID",
    checkToken,
    isAuthenticated,
    grantAccess("update", "customerComment"),
    crmController.editCustomerComment
);

module.exports = router;
