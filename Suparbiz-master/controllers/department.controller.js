const Employee = require("../models/employee.model");

module.exports.getAllDepartments = (req, res) => {
    Employee.aggregate([
        {
            $match: { organization: req.user.organization }
        },
        {
            $project: {
                department: 1
            }
        },
        {
            $group: {
                _id: "$department"
            }
        }
    ])
        .then(departments => {
            res.status(200).send(departments);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getDepartmentEmployees = (req, res) => {
    const { departmentName } = req.params;
    Employee.find({
        $and: [
            { organization: req.user.organization },
            { department: departmentName }
        ]
    })
        .then(departmentEmployees => {
            res.status(200).send(departmentEmployees);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};
