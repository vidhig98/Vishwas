module.exports.checkToken = (req, res, next) => {
    const authorizationHeader =
        req.headers["Authorization"] || req.headers["authorization"];
    if (authorizationHeader) {
        const token = authorizationHeader.slice(7, authorizationHeader.length);
        req.token = token;
        next();
    } else {
        res.status(403).json({
            message: "Forbidden: No Token Present for Authentication!"
        });
    }
};
