const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role : String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
