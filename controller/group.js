const {
  getRawGroupFunction,
  updateGroupNameFunction,
  getGroupListFunction,
  checkStatus,
  addGroup,
  updateGroupLink,
  deleteGroup,
  getLink,
} = require("../db/group");
const email = require("../utils/sendEmail");

const GroupController = {
  getRawGroup: async (req, res) => {
    const groupName = await getRawGroupFunction();
    return res.send(groupName);
  },
  updateold: async (req, res) => {
    const { array } = req.body;

    const result = await updateGroupNameFunction(array);

    if (result == "Whatsapp is not ready yet or Something went wrong") {
      return res.status(404).send(result);
    } else {
      return res.send(result);
    }
  },
  getGroupList: async (req, res) => {
    const groupList = await getGroupListFunction();
    return res.send(groupList);
  },
  status: async (req, res) => {
    const status = await checkStatus();
    return res.send(status);
  },
  add: async (req, res) => {
    const { groupLink, groupName } = req.body;

    if (!groupLink || !groupName) return res.status(401).send("invalid feilds");
    const group = await addGroup(req.body);

    if (group == "Whatsapp not working") {
      return res.status(401).send("Whatsapp not working");
    }
    if (group == "error") {
      return res.status(401).send('Couldn"t Find Group Name using this Name');
    }

    return res.send(group);
  },
  update: async (req, res) => {
    const updatedGroup = await updateGroupLink(req.body);
    return res.send(updatedGroup);
  },
  delete: async (req, res) => {
    const { id } = req.body;
    const result = await deleteGroup(id);
    return res.send(result);
  },
  getlink: async (req, res) => {
    try {
      const link = await getLink();
      return res.send(link);
    } catch (error) {
      console.log(error)
      const message =
        "if you are getting this email many time then contact the developer , few times is fine :)  ";
      await email.sendEmail({
        message,
        title: "Failed to get whatsapp group link",
      });

      return res.status(401).send(error);
    }
  },
};

module.exports = GroupController;
