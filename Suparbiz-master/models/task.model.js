const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const TaskSchema = new Schema(
    {
        name: { type: String, required: true },
        type: {
            type: String,
            enum: ["routine", "special"],
            required: true
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly"]
        },
        weekday: {
            type: String,
            enum: [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ]
        },
        status: {
            type: String,
            enum: ["pending", "complete", "incomplete"],
            default: "pending"
        },
        due_by: { type: Number },
        due_date: { type: Date },
        comments: { type: [ObjectId], ref: "TaskComment" },
        assigned_by: { type: ObjectId, ref: "User" },
        assigned_to_type: {
            type: String,
            enum: ["self", "all", "some"],
            default: "all"
        },
        assigned_to: { type: [ObjectId], ref: "User" },
        organization: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("Task", TaskSchema);
