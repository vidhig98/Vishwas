const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProductionSchema = new Schema(
    {
        machine_no:
        {
            type: String,
            required: [true, "Machine Number is required!"]
        },
        customer:
        {
            type: String,
            required: [true, "Customer Name is required!"]
        },
        UIN:
        {
            type: Number,
            required: [true, "UIN is required"]
        },
        width: {
            type: Number,
            required: [true, "Width is required!"]
        },
        length: {
            type: Number,
            required: [true, "Length is required!"]
        },
        expected_rolls: {
            type: Number,
            required: [true, " Expected Rolls is required!"]
        },
        actual_rolls: {
            type: Number,
            required: [true, " Actual rolls is required!"]
        },
        sq_mtr: {
            type: Number,
            required: [true, " Sq mtr is required!"]
        },
        posted_by: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("Production", ProductionSchema);
