const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const InventorySchema = new Schema(
    {
        item_name: 
        { 
            type: String, 
            required: [true, "Item Name is required!"] 
        },
        party_name: 
        {
            type: String,
            required: [true, "Party Name is required!"]
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
        GSM: {
            type: Number,
            required: [true, " GSM is required!"]
        },
        sq_mtr: {
            type: Number,
            required: [true, " Square Meter is required!"]
        },
        weight: {
            type: Number,
            required: [true, " Weight is required!"]
        },
        impression: {
            type: String,
            required: [true, " Impression is required!"]
        },
        posted_by: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("Inventory", InventorySchema);
