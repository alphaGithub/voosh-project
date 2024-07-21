const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: null,
      index: { unique: true },
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = {
  schema: userSchema,
  tableName: "User",
  modelName: "User",
  collectionName: "User",
  keys: Object.keys(userSchema.tree),
};
