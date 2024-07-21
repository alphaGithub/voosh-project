const mongoose = require("mongoose");
const { TASK_STATUS } = require("../constants");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    status: {
      type: String,
      default: TASK_STATUS.PENDING,
      require: true,
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: mongoose.Schema.Types.String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  schema: userSchema,
  tableName: "Task",
  modelName: "Task",
  collectionName: "Task",
  keys: Object.keys(userSchema.tree),
};
