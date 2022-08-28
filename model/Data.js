const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GroupSchema = new Schema({
  data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Group", GroupSchema);
