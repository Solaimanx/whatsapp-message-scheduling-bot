const Group = require("../model/Data");
const ContactListId = "6304cd6a88d2b862e0a5638c";

const { forEach } = require("p-iteration");
const { GroupChat } = require("whatsapp-web.js");
const { getGroupListFunction } = require('./group')
const whatsapp = require("../whatsappWeb");

const getAllContacts = async () => {
  const contactList = await Group.findById(ContactListId);
  return contactList;
};

const updateContactList = async () => {
  const group = await getGroupListFunction('yes');
  var arrayData = [];

  try {
    await forEach(group, async (g) => {
      const groupId = g.groupId;
      const groupName = g.groupName;
      const contacts = await whatsapp.client.getChatById(groupId);
      const participants = contacts.groupMetadata.participants;

      // loop group members
      participants.forEach(async (person) => {
        const number = person.id.user;
        const id = person.id._serialized;
        const obj = {
          number,
          id,
          groupName,
          groupId,
        };
        arrayData.push(obj);
      });
    });

    const updatedList = await Group.findOneAndUpdate(
      { _id: ContactListId },
      { data: arrayData },
      { new: true }
    );

    return updatedList;
  } catch (error) {
    return { error };
  }
};

const deleteContacts = async (id, groupId) => {
  var returnMessage = {
    removed: false,
    database: false,
    error: false,
  };

  try {
    const chat = await whatsapp.client.getChatById(groupId);
    const remove = await chat.removeParticipants([id]);

    if (remove.id == 200) {
      returnMessage.removed = true;
    }
    const { data: contactList } = await Group.findById(ContactListId);
    const filterContactList = contactList.filter((p) => p.id !== id);
    const updatedList = await Group.findOneAndUpdate(
      { _id: ContactListId },
      { data: filterContactList },
      { new: true }
    );
    if (updatedList) {
      returnMessage.database = true;
    }
    return returnMessage;
  } catch (error) {
    returnMessage.error = true;
    returnMessage.errorObject = error;
    return returnMessage;
  }
};

const addContacts = async (id, number, groupId, groupName) => {
  var returnMessage = {
    added: false,
    database: false,
    error: false,
  };

  try {
    const chat = await whatsapp.client.getChatById(groupId);
    const added = await chat.addParticipants([id]);

    if (added.id == 200) {
      returnMessage.added = true;
    }
    const { data: previousContacts } = await Group.findById(ContactListId);
    const updatedData = [...previousContacts];

    const newContact = {
      id,
      groupId,
      groupName,
      number,
    };

    updatedData.push(newContact);

    const updatedList = await Group.findOneAndUpdate(
      { _id: ContactListId },
      { data: updatedData },
      { new: true }
    );
    if (updatedList) {
      returnMessage.database = true;
    }
    return returnMessage;
  } catch (error) {
    returnMessage.error = true;
    returnMessage.errorObject = error;
    return returnMessage;
  }
};

module.exports = {
  getAllContacts,
  deleteContacts,
  updateContactList,
  addContacts
};
