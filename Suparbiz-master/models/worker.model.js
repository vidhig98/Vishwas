const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const WorkerSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "Worker First Name is required!"],
            trim: true
        },
        last_name: {
            type: String,
            required: [true, "Worker Last Name is required!"],
            trim: true
        },
        organization: {
            type: ObjectId,
            ref: "Organization"
        },
        phone: { type: String, trim: true }
    },
    schemaOptions
);

module.exports = mongoose.model("Worker", WorkerSchema);
