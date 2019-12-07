const { schemaOptions } = require("../configs/config");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const TaskCommentSchema = new Schema(
    {
        text: { type: String, required: true },
        posted_by: { type: ObjectId, ref: "User" },
        posted_to: { type: ObjectId, ref: "Task" },
        organization: { type: ObjectId, ref: "Organization" }
    },
    schemaOptions
);

module.exports = mongoose.model("TaskComment", TaskCommentSchema);
