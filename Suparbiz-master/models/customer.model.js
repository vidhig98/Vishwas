const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const CustomerSchema = new Schema(
    {
        company_name: {
            type: String,
            required: [true, "Company Name is required."]
        },
        contact_person: {
            type: String,
            required: [true, "Contact Person is required."]
        },
        phone: {
            type: Number,
            required: [true, "Mobile Number is required."]
        },
        email: {
            type: String,
            required: [true, "Email is required."]
        },
        website: {
            type: String
        },
        source: {
            type: String
        },
        order: {
            type: String,
            required: [true, "Order is required."]
        },
        comments: { type: [ObjectId], ref: "CustomerComment" },
        added_by: { type: ObjectId, ref: "User" },
        organization: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("Customer", CustomerSchema);
