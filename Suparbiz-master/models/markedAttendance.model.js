const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const MarkedAttendanceSchema = new Schema(
    {
        date: { type: Date, required: [true, "Attendance date is required!"] },
        marked: { type: Boolean, default: false },
        marked_by: {
            type: ObjectId,
            ref: "Employee",
            required: [true, "Attendance Marked by Employee is required!"]
        },
        organization: {
            type: ObjectId,
            ref: "Organization",
            required: [true, "Attendance Marked by Organization is required!"]
        }
    },
    schemaOptions
);

module.exports = mongoose.model("MarkedAttendance", MarkedAttendanceSchema);
