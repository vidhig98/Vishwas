const Task = require("../models/task.model");
const TaskComment = require("../models/taskComment.model");
const Employee = require("../models/employee.model");
const mongoose = require("mongoose");

module.exports.getTasks = (req, res) => {
    res.status(200).json({ message: "Get Tasks!" });
};

module.exports.getTaskCount = (req, res) => {
    Task.aggregate([
        {
            $match: {
                $and: [
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    },
                    {
                        $or: [
                            { assigned_to_type: "all" },
                            {
                                $and: [
                                    { assigned_to_type: "self" },
                                    { assigned_by: req.user._id }
                                ]
                            },
                            {
                                $and: [
                                    { assigned_to_type: "some" },
                                    { _id: { $in: req.user.tasks.assigned } }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 }
            }
        }
    ])
        .then(taskCount => {
            res.status(200).send(taskCount);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getRoutineTasks = (req, res) => {
    Task.aggregate([
        {
            $match: {
                $and: [
                    { type: "routine" },
                    {
                        $or: [
                            { assigned_to_type: "all" },
                            {
                                $and: [
                                    { assigned_to_type: "self" },
                                    { assigned_by: req.user._id }
                                ]
                            },
                            {
                                $and: [
                                    { assigned_to_type: "some" },
                                    { _id: { $in: req.user.tasks.assigned } }
                                ]
                            }
                        ]
                    },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "taskcomments",
                localField: "comments",
                foreignField: "_id",
                as: "comments"
            }
        },
        {
            $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.posted_by",
                foreignField: "_id",
                as: "comments.posted_by"
            }
        },
        {
            $project: {
                status: 1,
                assigned_by: 1,
                assigned_to: 1,
                name: 1,
                type: 1,
                frequency: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1,
                comments: {
                    _id: 1,
                    text: 1,
                    posted_by: { $arrayElemAt: ["$comments.posted_by", 0] },
                    posted_to: 1,
                    organization: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    status: "$status",
                    name: "$name",
                    type: "$type",
                    frequency: "$frequency",
                    assigned_by: "$assigned_by",
                    organization: "$organization",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                    assigned_to: "$assigned_to"
                },
                comments: {
                    $push: "$comments"
                }
            }
        }
    ])
        .then(routineTasks => {
            res.status(200).send(routineTasks);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getSpecialTasks = (req, res) => {
    Task.aggregate([
        {
            $match: {
                $and: [
                    { type: "special" },
                    {
                        $or: [
                            { assigned_to_type: "all" },
                            {
                                $and: [
                                    { assigned_to_type: "self" },
                                    { assigned_by: req.user._id }
                                ]
                            },
                            {
                                $and: [
                                    { assigned_to_type: "some" },
                                    { _id: { $in: req.user.tasks.assigned } }
                                ]
                            }
                        ]
                    },
                    {
                        organization: mongoose.Types.ObjectId(
                            req.user.organization
                        )
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "taskcomments",
                localField: "comments",
                foreignField: "_id",
                as: "comments"
            }
        },
        {
            $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "comments.posted_by",
                foreignField: "_id",
                as: "comments.posted_by"
            }
        },
        {
            $project: {
                status: 1,
                assigned_by: 1,
                assigned_to: 1,
                name: 1,
                type: 1,
                frequency: 1,
                organization: 1,
                createdAt: 1,
                updatedAt: 1,
                comments: {
                    _id: 1,
                    text: 1,
                    posted_by: { $arrayElemAt: ["$comments.posted_by", 0] },
                    posted_to: 1,
                    organization: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    status: "$status",
                    name: "$name",
                    type: "$type",
                    frequency: "$frequency",
                    assigned_by: "$assigned_by",
                    organization: "$organization",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                    assigned_to: "$assigned_to"
                },
                comments: {
                    $push: "$comments"
                }
            }
        }
    ])
        .then(specialTasks => {
            res.status(200).send(specialTasks);
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.postTask = (req, res) => {
    const { name, type, assigned_to_type } = req.body;
    let newTask;
    switch (type) {
        case "routine":
            const { frequency } = req.body;
            switch (frequency) {
                case "daily":
                    if (assigned_to_type == "all") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type
                        });
                    } else if (assigned_to_type == "self") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: [req.user._id]
                        });
                    } else {
                        let { assigned_to } = req.body;
                        assigned_to = assigned_to.filter(emp => emp._id);
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: assigned_to
                        });
                    }
                    break;

                case "weekly":
                    const { weekday } = req.body;
                    if (assigned_to_type == "all") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            weekday: weekday,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type
                        });
                    } else if (assigned_to_type == "self") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            weekday: weekday,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: [req.user._id]
                        });
                    } else {
                        let { assigned_to } = req.body;
                        assigned_to = assigned_to.filter(emp => emp._id);
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            weekday: weekday,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: assigned_to
                        });
                    }
                    break;

                case "monthly":
                    const { due_by } = req.body;
                    if (assigned_to_type == "all") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            due_by: due_by,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type
                        });
                    } else if (assigned_to_type == "self") {
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            due_by: due_by,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: [req.user._id]
                        });
                    } else {
                        let { assigned_to } = req.body;
                        assigned_to = assigned_to.filter(emp => emp._id);
                        newTask = new Task({
                            name: name,
                            type: type,
                            frequency: frequency,
                            due_by: due_by,
                            assigned_by: req.user._id,
                            organization: req.user.organization,
                            assigned_to_type: assigned_to_type,
                            assigned_to: assigned_to
                        });
                    }
                    break;
            }
            break;

        case "special":
            const { due_date } = req.body;
            if (assigned_to_type == "all") {
                newTask = new Task({
                    name: name,
                    type: type,
                    due_date: due_date,
                    assigned_by: req.user._id,
                    organization: req.user.organization,
                    assigned_to_type: assigned_to_type
                });
            } else if (assigned_to_type == "self") {
                newTask = new Task({
                    name: name,
                    type: type,
                    due_date: due_date,
                    assigned_by: req.user._id,
                    organization: req.user.organization,
                    assigned_to_type: assigned_to_type,
                    assigned_to: [req.user._id]
                });
            } else {
                let { assigned_to } = req.body;
                assigned_to = assigned_to.filter(emp => emp._id);
                newTask = new Task({
                    name: name,
                    type: type,
                    due_date: due_date,
                    assigned_by: req.user._id,
                    organization: req.user.organization,
                    assigned_to_type: assigned_to_type,
                    assigned_to: assigned_to
                });
            }
            break;
    }
    newTask
        .save()
        .then(taskCreated => {
            if (assigned_to_type == "some") {
                return Employee.updateMany(
                    {
                        $and: [
                            { _id: { $in: taskCreated.assigned_to } },
                            { organization: req.user.organization }
                        ]
                    },
                    { $push: { "tasks.assigned": taskCreated._id } }
                );
            } else if (assigned_to_type == "self") {
                return Employee.update(
                    {
                        $and: [
                            { _id: { $in: taskCreated.assigned_to } },
                            { organization: req.user.organization }
                        ]
                    },
                    { $push: { "tasks.assigned": taskCreated._id } }
                );
            } else {
                res.status(201).json({ message: "Task Created Successfully!" });
            }
        })
        .then(taskAssigned => {
            // console.log(taskAssigned);
            res.status(201).json({ message: "Task Created Successfully!" });
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.editTask = (req, res) => {
    const { taskID } = req.params;
    const { name } = req.body;
    Task.findOneAndUpdate(
        {
            $and: [{ _id: taskID }, { organization: req.user.organization }]
        },
        { name: name },
        { new: true }
    )
        .then(updatedTask => {
            res.status(200).send(updatedTask);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.deleteTask = (req, res) => {
    const { taskID } = req.params;
    Task.findOneAndDelete({
        $and: [{ _id: taskID }, { organization: req.user.organization }]
    })
        .then(deletedTask => {
            TaskComment.deleteMany({ posted_to: taskID })
                .then(deleted => {
                    res.status(200).json({
                        message: "Task Deleted Successfully!"
                    });
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.postTaskComment = (req, res) => {
    const { taskID } = req.params;
    const { text } = req.body;
    const newTaskComment = new TaskComment({
        text: text,
        posted_by: req.user._id,
        posted_to: taskID,
        organization: req.user.organization
    });
    newTaskComment
        .save()
        .then(taskComment => {
            Task.findByIdAndUpdate(taskID, {
                $push: { comments: taskComment._id }
            })
                .then(updatedTask => {
                    res.status(201).send(taskComment);
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.editTaskComment = (req, res) => {
    const { taskID, commentID } = req.params;
    const { text } = req.body;
    TaskComment.findOneAndUpdate(
        {
            $and: [
                { _id: commentID },
                { posted_to: taskID },
                { organization: req.user.organization }
            ]
        },
        { text: text },
        { new: true }
    )
        .then(updatedComment => {
            res.status(200).send(updatedComment);
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};

module.exports.deleteTaskComment = (req, res) => {
    const { taskID, commentID } = req.params;
    Task.findByIdAndUpdate(taskID, {
        $pull: { comments: { $in: [commentID] } }
    })
        .then(updatedTask => {
            TaskComment.findByIdAndDelete(commentID)
                .exec()
                .then(deleted => {
                    res.status(200).json({
                        message: "Comment Deleted Successfully!"
                    });
                })
                .catch(error => res.status(400).json({ message: `${error}` }));
        })
        .catch(error => res.status(400).json({ message: `${error}` }));
};
