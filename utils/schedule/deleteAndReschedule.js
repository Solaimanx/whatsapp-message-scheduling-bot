const scheduleLater = require("node-schedule");
const { sendWhatsappMessage } = require("../../utils/sendMessage");
const {
  updateStateToFailed,
  updateStateToSuccess,
} = require("../../db/schedule");

const deleteCornSchedule = async (scheduleName) => {
  try {
    const job = schedule.scheduledJobs[scheduleName];
    job.cancel();
  } catch (error) {
    console.log(error);
  }
};

const createSingleSchedule = (item) => {
  const scheduleId = item._id.toString();
  const date = item.date;

  const job = scheduleLater.scheduleJob(scheduleId, date, async function () {
    const scheduleId = item._id.toString();
    const groupList = await getGroupListFunction("yes");
    // check if any group exits
    if (groupList.length == 0) return console.log("cant find group list");

    groupList.forEach(async (group, idx) => {
      const GroupId = group.groupId;
      // related to message from item object
      const convertIntoSec = Number(item.speed) * 1000;
      const timeWait = convertIntoSec * idx;

      setTimeout(async function () {
        const isMessageSent = await sendWhatsappMessage(item, GroupId);
        if (isMessageSent) {
          await updateStateToSuccess(scheduleId);
        } else {
          await updateStateToFailed(scheduleId);
        }
      }, timeWait);
    });
  });
};

const deleteAndReschedule = (schedule) => {
  const status = schedule.status;
  const scheduleName = schedule._id.toString();
  if (status !== "pending") return;
  deleteCornSchedule(scheduleName);
  createSingleSchedule(schedule);
};

module.exports = {
  deleteCornSchedule,
  deleteAndReschedule,
  createSingleSchedule,
};
