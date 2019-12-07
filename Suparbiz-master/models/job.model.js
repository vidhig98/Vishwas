const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const JobSchema = new Schema(
    {
        profile: { type: String, required: [true, "Job Profile is required!"] },
        department: {
            type: String,
            required: [true, "Job Department is required!"]
        },
        salary: { type: Number },
        qualification: {
            type: String,
            required: [true, "Job Qualification is required!"]
        },
        experience: {
            type: Number,
            required: [true, "Job Experience is required!"]
        },
        openings: {
            type: Number,
            required: [true, "Job Openings is required!"]
        },
        posted_by: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("Job", JobSchema);
