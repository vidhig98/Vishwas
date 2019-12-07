const Employee = require("../models/employee.model");
const { sendEmail } = require("../utils/email.util");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const newEmployeeEmailSubject = "Your Suparbiz Account Credentials";

module.exports.searchEmployees = (req, res) => {
    const { q } = req.query;
    Employee.find({
        $and: [
            { organization: req.user.organization },
            { $text: { $search: q } }
        ]
    })
        .select("first_name last_name department")
        .then(employees => {
            res.status(200).json(employees);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getAllEmployees = (req, res) => {
    Employee.find({ organization: req.user.organization })
        .then(employees => {
            if (!employees) {
                res.status(400).json({ message: "Employees Not Found!" });
            } else {
                res.status(200).json({
                    message: "Employees Found!",
                    data: employees
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getEmployee = (req, res) => {
    const { empID } = req.params;
    Employee.findById(empID)
        .then(employee => {
            if (!employee) {
                res.status(400).json({ message: "Employee Not Found!" });
            } else {
                res.status(200).json({
                    message: "Employee Found!",
                    data: employee
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postEmployee = (req, res) => {
    const {
        first_name,
        last_name,
        designation,
        dob,
        gender,
        personal_email,
        work_email,
        department,
        phone
    } = req.body;
    let organizationEmployeeCount, username, password;
    Employee.count({
        organization: req.user.organization
    })
        .then(employeeCount => {
            organizationEmployeeCount = employeeCount;
            username = `emp${organizationEmployeeCount + 1}`;
            password = uuid.v4();
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const newEmployee = new Employee({
                first_name: first_name,
                last_name: last_name,
                work_email: work_email,
                personal_email: personal_email,
                department: department,
                designation: designation,
                dob: Date(dob),
                gender: gender,
                phone: phone,
                role: req.body.role ? req.body.role : "employee",
                username: username,
                password: hashedPassword,
                organization: req.user.organization
            });
            return newEmployee.save();
        })
        .then(addedEmployee => {
            const newEmployeeEmailSubject = "Your Suparbiz Account Credentials";
            const newEmployeeEmailMessage = `<html><body>Username: <b>${username}</b><br>Password: <b>${password}</b></body></html>`;
            return sendEmail(
                addedEmployee.work_email,
                newEmployeeEmailSubject,
                newEmployeeEmailMessage
            );
        })
        .then(sentEmail => {
            res.status(200).json({ message: "Employee Created Successfully" });
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.putEmployee = (req, res) => {
    const {
        first_name,
        last_name,
        designation,
        dob,
        gender,
        personal_email,
        work_email,
        department,
        phone
    } = req.body;
    const { empID } = req.params;
    const employeeUpdates = {
        first_name: first_name,
        last_name: last_name,
        work_email: work_email,
        personal_email: personal_email,
        department: department,
        designation: designation,
        dob: dob,
        gender: gender,
        phone: phone,
        organization: req.user.organization
    };
    Employee.findOneAndUpdate({ _id: empID }, employeeUpdates)
        .then(updatedEmployees => {
            if (!updatedEmployees) {
                res.status(400).json({ message: "Error Updating Employee!" });
            } else {
                res.status(201).json({
                    message: "Employee Updated Successfully!"
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.deleteEmployee = (req, res) => {
    const { empID } = req.params;
    Employee.findByIdAndDelete(empID)
        .then(employee => {
            if (!employee) {
                res.status(400).json({ message: "Employee Not Found!" });
            } else {
                res.status(200).json({
                    message: "Employee Data Deleted Successfully!"
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
