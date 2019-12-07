const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const path = require("path");
const config = require("../configs/config");
const Employee = require("../models/employee.model");

// let privateKey = fs.readFileSync(
//   path.join(__dirname + "/../keys/private.pem"),
//   { encoding: "utf8" }
// );
// let publicKey = fs.readFileSync(path.join(__dirname + "/../keys/public.pem"), {
//   encoding: "utf8"
// });

exports.getLogin = (req, res) => {
    res.send("Get Login");
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    Employee.findOne({ username: username })
        .select("+password")
        .then(user => {
            if (!user) {
                res.status(401).json({ message: "Invalid Username!" });
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then(matched => {
                        if (!matched) {
                            res.status(401).json({
                                message: "Invalid Password!"
                            });
                        } else {
                            jwt.sign(
                                {
                                    uid: user._id
                                },
                                process.env.SECRET,
                                config.tokenSignOptions,
                                (error, signedToken) => {
                                    if (error) {
                                        console.error(error);
                                        res.status(500).json({
                                            message: `${error}`
                                        });
                                    } else {
                                        delete user._doc.password;
                                        res.status(200).json({
                                            token: signedToken,
                                            user: user
                                        });
                                    }
                                }
                            );
                        }
                    })
                    .catch(error =>
                        res.status(500).json({
                            message: `${error}`
                        })
                    );
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

exports.getSignup = (req, res) => {
    res.send("Get Signup");
};

// exports.postSignup = (req, res) => {
//     const { firstName, lastName, username, email, password } = req.body;
//     User.findOne({ username: username })
//         .then(user => {
//             if (user) {
//                 res.json({ message: "User Exists Already!" });
//             } else {
//                 bcrypt
//                     .hash(password, 12)
//                     .then(hashedPassword => {
//                         const newUser = new User({
//                             first_name: firstName,
//                             last_name: lastName,
//                             username: username,
//                             email: email,
//                             password: hashedPassword
//                         });
//                         return newUser.save({ validateBeforeSave: true });
//                     })
//                     .then(created => {
//                         if (created) {
//                             res.status(201).json({
//                                 message: "User Created Successfully!"
//                             });
//                         } else {
//                             res.status(400).json({
//                                 message:
//                                     "Error Encountered while creating User!"
//                             });
//                         }
//                     })
//                     .catch(error =>
//                         res.status(400).json({ message: `${error}` })
//                     );
//             }
//         })
//         .catch(error => res.status(400).json({ message: `${error}` }));
// };
