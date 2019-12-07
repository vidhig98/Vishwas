const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const EmployeeSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "Employee First Name is required!"],
            trim: true
        },
        last_name: {
            type: String,
            required: [true, "Employee Last Name is required!"],
            trim: true
        },
        dob: {
            type: Date,
            required: [true, "Employee Date of Birth is required!"],
            trim: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Employee Gender is required!"],
            trim: true
        },
        username: {
            type: String,
            required: [true, "Employee Username is required!"],
            trim: true
        },
        personal_email: {
            type: String,
            required: [true, "Employee Personal Email is required!"],
            trim: true
        },
        work_email: {
            type: String,
            required: [true, "Employee Work Email is required!"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Employee Password is required!"],
            select: false
        },
        organization: {
            type: ObjectId,
            ref: "Organization"
        },
        department: {
            type: String,
            required: [true, "Employee Department is required!"],
            trim: true
        },
        designation: {
            type: String,
            required: [true, "Employee Designation is required!"],
            trim: true
        },
        phone: { type: String, trim: true },
        role: { type: String, default: "employee" },
        tasks: {
            assigned: {
                type: [ObjectId],
                ref: "Task"
            },
            completed: {
                type: [ObjectId],
                ref: "Task"
            }
        }
    },
    schemaOptions
);

EmployeeSchema.index({ first_name: "text", last_name: "text" });

module.exports = mongoose.model("Employee", EmployeeSchema);
