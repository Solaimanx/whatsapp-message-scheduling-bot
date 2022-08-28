const getGroupDetailes = async (allGroup, targetGroupName) => {
  const matchedArray = [];

  allGroup.map((item) => {
    const groupName = item.name;
    const groupId = item.id._serialized;
    const participants = item.groupMetadata.participants;

    const isMatched = targetGroupName === groupName;
    if (isMatched) {
      const obj = {
        groupName,
        groupId,
        memebers: participants.length,
      };
      matchedArray.push(obj);
    }
  });

  return matchedArray;
};

const getGroupSerializeId = async (client, targetGroupName) => {
  try {
    const getChat = await client.getChats();
    const allGroupChat = getChat.filter((c) => c.isGroup == true);

    const selectedGroup = await getGroupDetailes(allGroupChat, targetGroupName);

    return selectedGroup;
  } catch (error) {
    console.log(error);
    const message = "Whatsapp not working";
    return message;
  }
};

const getGroupMembersNumber = async (client, groupId) => {
  const chat = await client.getChatById(groupId);
  const participants = chat.groupMetadata.participants;
  return participants.length;
};

module.exports = { getGroupSerializeId, getGroupMembersNumber };
