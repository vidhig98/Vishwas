const Attendance = require("../models/attendance.model");
const MarkedAttendance = require("../models/markedAttendance.model");

const moment = require("moment");

module.exports.postAllUsersAttendance = (req, res) => {
    const { users } = req.body;
    const today = new Date().toISOString().split("T")[0];
    MarkedAttendance.findOne({ date: today })
        .then(marked => {
            if (!marked) {
                // Mark All User's Attendance
                Attendance.insertMany(users)
                    .then(docs => {
                        if (!docs) {
                            res.status(400).json({
                                message: "Error: Unable to mark Attendance!"
                            });
                        } else {
                            // Set Attendance Marked for the day
                            const attendanceForTheDay = new MarkedAttendance({
                                date: today,
                                marked: true,
                                marked_by: req.user._id,
                                organization: req.user.organization
                            });
                            attendanceForTheDay
                                .save()
                                .then(attendanceMarked => {
                                    if (!attendanceMarked) {
                                        res.status(400).json({
                                            message: "Error Saving Attendance!"
                                        });
                                    } else {
                                        res.status(201).json({
                                            message:
                                                "Attendance Marked Successfully!"
                                        });
                                    }
                                })
                                .catch(error =>
                                    res
                                        .status(500)
                                        .json({ message: `${error}` })
                                );
                        }
                    })
                    .catch(error =>
                        res.status(500).json({ message: `${error}` })
                    );
            } else {
                res.status(200).json({
                    message: "Attendance Already Marked for the Day!"
                });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

module.exports.getAllUsersAttendance = (req, res) => {
    Attendance.aggregate([
        {
            $match: { organization: req.user.organization }
        },
        {
            $group: {
                _id: {
                    user_id: "$user_id",
                    attendance: "$attendance"
                },
                count: {
                    $sum: 1
                }
            }
        },
        {
            $group: {
                _id: "$_id.user_id",
                attendance: {
                    $push: {
                        status: "$_id.attendance",
                        count: "$count"
                    }
                }
            }
        },
        {
            $lookup: {
                from: "employees",
                localField: "_id",
                foreignField: "_id",
                as: "employee"
            }
        }
    ])
        .then(attendanceData => {
            res.status(200).send(attendanceData);
        })
        .catch(error => console.error(error));
};

module.exports.getUserMonthlyAttendance = (req, res) => {
    const { userID } = req.params;
    const { month, year } = req.body;
    const monthStart = moment()
        .month(month)
        .year(year)
        .startOf("month");
    const monthEnd = moment()
        .month(month)
        .year(year)
        .endOf("month");
    Attendance.find({
        $and: [
            { user_id: userID },
            {
                date: {
                    $gte: monthStart.toDate(),
                    $lt: monthEnd.toDate()
                }
            }
        ]
    })
        .then(userAttendance => {
            res.status(200).send(userAttendance);
        })
        .catch(error => console.error(error));
};

module.exports.patchSingleUserAttendance = (req, res) => {
    const { userID } = req.params;
    const { attendance } = req.body;
    const today = new Date().toISOString().split("T")[0];
    Attendance.findOneAndUpdate(
        { date: today, user_id: userID, organization: req.user.organization },
        { attendance: attendance }
    )
        .then(updatedAttendanceRecord => {
            if (!updatedAttendanceRecord) {
                res.status(400).json({ message: "Error Updating Attendance!" });
            } else {
                res.status(200).json({ message: "Attendance Updated!" });
            }
        })
        .catch(error => res.status(500).json({ message: `${error}` }));
};

addPreceedingZeroes = n => {
    if (n < 10) {
        return `0${n}`;
    }
    return n;
};
