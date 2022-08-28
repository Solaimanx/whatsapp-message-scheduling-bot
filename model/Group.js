const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const GroupLinkSchema = new Schema({
  groupName: {
    type: String,
    require: true,
  },

  groupLink: {
    type: String,
    require: true,
  },
  groupId: String,
  members: {
    type: Number,
    default: 0,
  },
  enabledForMessage: {
    type: Boolean,
    default: false,
  },
  activeForShare: {
    type: Boolean,
    default: false,
  },
  defaultLink :{
    type: Boolean,
    default: false,
  },


});

module.exports = mongoose.model("GroupLink", GroupLinkSchema);
