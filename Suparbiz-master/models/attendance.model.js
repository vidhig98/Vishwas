const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const AttendanceSchema = new Schema(
    {
        user_id: { type: ObjectId, ref: "User", required: true },
        attendance: {
            type: String,
            required: true,
            enum: ["present", "absent", "halfday"],
            default: "absent"
        },
        overtime: {
            type: Number
        },
        organization: {
            type: ObjectId,
            ref: "Organization",
            required: true
        },
        date: { type: Date, default: new Date().toISOString().split("T")[0] }
    },
    schemaOptions
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
