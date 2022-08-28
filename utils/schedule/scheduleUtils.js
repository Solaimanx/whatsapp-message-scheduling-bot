const GroupNameId = "62e848e3e9fea01b98f54139";
const Group = require("../../model/Data");
const Schedule = require("../../model/schedule");
const scheduleLater = require("node-schedule");
const { sendWhatsappMessage } = require("../sendMessage");
const { getGroupListFunction ,updateGroupMembersNumber } = require("../../db/group");
const {
  updateStateToFailed,
  updateStateToSuccess,
} = require("../../db/schedule");
const { updateContactList } = require("../../db/Contacts");

// chagne status to faild if date has been passed
const checkScheduleExpried = async () => {
  const pending = await Schedule.find({
    status: "pending",
    date: {
      $lt: new Date(),
    },
  });

  pending.forEach(async (item) => {
    const ScheduleId = item._id.toString();
    await Schedule.findOneAndUpdate(
      { _id: ScheduleId },
      {
        status: "failed",
      },
      {
        new: true,
      }
    );
  });
};

// schedule all pending schedule
const scheduleAllPending = async () => {
  const pending = await Schedule.find({
    status: "pending",
    date: {
      $gte: new Date(),
    },
  });
  if (pending == undefined || pending.length == 0)
    return console.log("cant find pending schedule");

  pending.forEach((item) => {
    const scheduleId = item._id.toString();
    const date = item.date;

    const job = scheduleLater.scheduleJob(
      scheduleId,
      date,
      async function () {
        const scheduleId = item._id.toString();
        const groupList = await getGroupListFunction('yes');
        // check if any group exits
        if (groupList.length == 0) return console.log("cant find group list");

        groupList.forEach(async (group, idx) => {
          const GroupId = group.groupId;

          // related to message from item object
          const convertIntoSec = Number(item.speed) * 1000;
          const timeWait = convertIntoSec * idx;
          const message = item.message;
          setTimeout(async function () {

            const isMessageSent = await sendWhatsappMessage(item, GroupId);
            if (isMessageSent) {
              await updateStateToSuccess(scheduleId);
            } else {
              await updateStateToFailed(scheduleId);
            }
          }, timeWait);
        });
      }
    );
    console.log(`schedule done for ${scheduleId}`);
  });
};

// update contact list in every 1 days
const everyDayUpdateContactList = async () => {
  const job = scheduleLater.scheduleJob(
    "everydayUpdateContactList",
    " 0 0  23  * * *",
    async function () {
      await updateContactList();
      console.log("updated contact list for today ");
    }
  );
};

// update group member number in every 15 days

const everyDayUpdateGroupMembers = async () => {
  const job = scheduleLater.scheduleJob(
    "everydayUpdateGroupMembers",
    " 0 0  20  * * *",
    async function () {
      await updateGroupMembersNumber();
      console.log("updated Group Members Number for today ");
    }
  );
};


module.exports = {
  checkScheduleExpried,
  scheduleAllPending,
  everyDayUpdateContactList,
};
