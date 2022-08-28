const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
      default: 5,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
    },
    notes: {
      type: String,
    },
    personNumber: {
      type: String,
    },

    image: {
      type: String,
    },

    afterFinish: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);
