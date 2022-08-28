const {
  getAllContacts,
  updateContactList,
  deleteContacts,
  addContacts,
} = require("../db/Contacts");

const ContactsController = {
  getAll: async (req, res) => {
    const result = await getAllContacts();
    res.send(result);
  },
  update: async (req, res) => {
    const newData = await updateContactList();
    if (newData.error) {
      res.status(401).send(newData);
    } else {
      res.send(newData);
    }
  },
  delete: async (req, res) => {
    const { id, groupId } = req.body;

    const deletedContact = await deleteContacts(id, groupId);

    if (deletedContact.error) {
      return res.status(401).send(deletedContact);
    }

    res.send(deletedContact);
  },
  add: async (req, res) => {
    const { id, groupId, number, groupName } = req.body;
    const added = await addContacts(id, number, groupId, groupName);
    if (added.error) {
      return res.status(401).send(added);
    }

    res.send(added);
  },
};

module.exports = ContactsController;
