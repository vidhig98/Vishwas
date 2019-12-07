const joi = require("@hapi/joi");
const validator = require("validator");
const whitelistCharacters = "a-zA-Z0-9,.&@ ";

const sanitizeInput = input => {
    for (let property in input) {
        // if (input.hasOwnProperty(property)) {
        if (property != "password") {
            input[property] = validator.whitelist(
                input[property],
                whitelistCharacters
            );
        }
        // }
    }
    return input;
};

const escapeInput = input => {
    for (let property in input) {
        // if (input.hasOwnProperty(property)) {
        if (property != "password") {
            input[property] = validator.escape(input[property]);
        }
        // }
    }
    return input;
};

module.exports.validateLogin = (req, res, next) => {
    req.body = escapeInput(req.body);
    const loginValidationSchema = joi.object().keys({
        username: joi
            .string()
            .trim()
            .required(),
        password: joi.string().required()
    });

    joi.validate(req.body, loginValidationSchema, {
        abortEarly: false
    })
        .then(value => {
            next();
        })
        .catch(error => res.status(422).json({ message: `${error}` }));
};
