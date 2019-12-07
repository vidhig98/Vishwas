const jwt = require("jsonwebtoken");
const Employee = require("../models/employee.model");

module.exports.isAuthenticated = (req, res, next) => {
    const token = req.token;
    jwt.verify(token, process.env.SECRET, (error, authorizedData) => {
        if (error) {
            res.status(401).json({
                message: "Token Invalid: Authentication Failed!"
            });
        } else {
            const { uid, exp } = authorizedData;
            const current_time = new Date().getTime() / 1000;
            if (exp > current_time) {
                Employee.findById(uid)
                    .then(user => {
                        if (!user) {
                            res.status(403).json({
                                message: "Unauthorized User!"
                            });
                        } else {
                            req.user = user;
                            next();
                        }
                    })
                    .catch(error =>
                        res.status(400).json({ message: `${error}` })
                    );
            } else {
                res.status(401).json({ message: "Token Expired" });
            }
        }
    });
};
