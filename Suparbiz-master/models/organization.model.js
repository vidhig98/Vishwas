const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrganizationSchema = new Schema(
    {
        name: { type: String, required: true }
    },
    schemaOptions
);

module.exports = mongoose.model("Organization", OrganizationSchema);
