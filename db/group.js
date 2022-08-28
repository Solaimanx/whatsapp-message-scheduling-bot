const Group = require("../model/Data");
const GroupLink = require("../model/Group");

const GroupNameId = "62e848e3e9fea01b98f54139";
const whatsapp = require("../whatsappWeb");
const {
  getGroupSerializeId,
  getGroupMembersNumber,
} = require("../utils/utils");
const schedule = require("node-schedule");

const getRawGroupFunction = async () => {
  const groupName = await Group.findById(GroupNameId);
  return groupName;
};
const updateGroupNameFunction = async (array) => {
  // const fields = {
  //   data: array,
  // };
  // await Group.findOneAndUpdate(
  //   { _id: GroupNameId },
  //   { ...fields },
  //   { new: true }
  // );
  // if (whatsapp.client?.info == undefined) {
  //   const m = "Whatsapp is not ready yet or Something went wrong";
  //   return m;
  // } else {
  //   const result = await getGroupSerializeId(whatsapp.client);
  //   return result;
  // }
};
const getGroupListFunction = async (onlyForMessage) => {
  if (onlyForMessage == "yes") {
    const groupList = await GroupLink.find({
      enabledForMessage: true,
    });
    return groupList;
  } else {
    const groupList = await GroupLink.find();
    return groupList;
  }
};

const checkStatus = async () => {
  // create new document
  const date = new Date();
  console.log(date);
  console.log(date.toString());
  console.log(new Date().toLocaleString());

  if (whatsapp.client.info == undefined) {
    return "Not Running";
  } else {
    return "Running";
  }
};

const addGroup = async (fields) => {
  const { groupName, groupLink } = fields;

  const result = await getGroupSerializeId(whatsapp.client, groupName);

  if (result == "Whatsapp not working") {
    return "Whatsapp not working";
  }
  console.log(result);

  if (result.length == 1) {
    const data = {
      groupLink,
      groupName: result[0].groupName,
      groupId: result[0].groupId,
      members: result[0].memebers,
    };

    const createGroup = await GroupLink.create({ ...data });
    return createGroup;
  } else {
    return "error";
  }
};

const updateGroupLink = async (body) => {
  const { id, ...restOfField } = body;

  const group = await GroupLink.findOneAndUpdate(
    { _id: id },
    { ...restOfField },
    { new: true }
  );
  return group;
};

const deleteGroup = async (id) => {
  const result = await GroupLink.findByIdAndRemove(id);
  return result;
};

const getLink = async () => {
  // get the current share link
  const link = await GroupLink.findOne({ activeForShare: true });
  const linkId = link?._id.toString();
  const members = link?.members;

  if (members > 250) {
    await GroupLink.findOneAndUpdate(
      { _id: linkId },
      { activeForShare: false },
      {
        new: true,
      }
    );

    const newGroup = await GroupLink.findOne({
      activeForShare: false,
      defaultLink: false,
    })
      .where("members")
      .lt(250);

    const id = newGroup?._id?.toString();

    const activeNewGroup = await GroupLink.findOneAndUpdate(
      { _id: id },
      { activeForShare: true },
      {
        new: true,
      }
    );
    console.log(activeNewGroup);

    // return the data
    const data = {
      link: activeNewGroup.groupLink,
    };
    return data;
  } else {
    // increase the member
    const increaseMember = await GroupLink.findOneAndUpdate(
      { _id: linkId },
      { members: members + 1 },
      {
        new: true,
      }
    );

    // return the data
    const data = {
      link: link.groupLink,
    };
    return data;
  }
};

const updateGroupMembersNumber = async () => {
  const link = await GroupLink.find({ activeForShare: true });
  const id = link[0]._id.toString();
  const groupId = link[0].groupId;

  const NumberOfMembers = await getGroupMembersNumber(whatsapp.client, groupId);

  await GroupLink.findOneAndUpdate(
    { _id: id },
    { members: NumberOfMembers },
    {
      new: true,
    }
  );
};

module.exports = {
  getRawGroupFunction,
  updateGroupNameFunction,
  getGroupListFunction,
  checkStatus,
  addGroup,
  updateGroupLink,
  deleteGroup,
  getLink,
  updateGroupMembersNumber,
};
