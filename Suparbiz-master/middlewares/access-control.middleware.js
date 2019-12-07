const { ac } = require("../utils/access-control.util");
const _ = require("lodash");

module.exports.grantAccess = (action, resource) => {
    return (req, res, next) => {
        let permission;
        switch (resource) {
            case "attendance":
                if (!_.isEmpty(req.params)) {
                    if (_.has(req.params, "userID")) {
                        if (req.params.userID == req.user._id) {
                            permission = ac.permission({
                                role: req.user.role,
                                action: `${action}:own`,
                                resource: resource
                            });
                        } else {
                            permission = ac.permission({
                                role: req.user.role,
                                action: `${action}:any`,
                                resource: resource
                            });
                        }
                    } else {
                        permission = ac.permission({
                            role: req.user.role,
                            action: `${action}:any`,
                            resource: resource
                        });
                    }
                } else {
                    permission = ac.permission({
                        role: req.user.role,
                        action: `${action}:any`,
                        resource: resource
                    });
                }
                break;

            case "customer":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "customerComment":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "department":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "employee":
                if (!_.isEmpty(req.params)) {
                    if (_.has(req.params, "empID")) {
                        if (req.params.empID == req.user._id) {
                            permission = ac.permission({
                                role: req.user.role,
                                action: `${action}:own`,
                                resource: resource
                            });
                        } else {
                            permission = ac.permission({
                                role: req.user.role,
                                action: `${action}:any`,
                                resource: resource
                            });
                        }
                    } else {
                        permission = ac.permission({
                            role: req.user.role,
                            action: `${action}:any`,
                            resource: resource
                        });
                    }
                } else {
                    permission = ac.permission({
                        role: req.user.role,
                        action: `${action}:any`,
                        resource: resource
                    });
                }
                break;

            case "job":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "inventory":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "production":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "lead":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "leadComment":
                permission = ac.permission({
                    role: req.user.role,
                    action: `${action}:any`,
                    resource: resource
                });
                break;

            case "task":

            case "taskComment":
        }

        if (permission.granted) {
            next();
        } else {
            res.status(403).json({
                message: "Forbidden: You Do Not Have Enough Permissions!"
            });
        }
    };
};
