const whatsapp = require("../whatsappWeb");
const { MessageMedia } = require("whatsapp-web.js");
const { v4: uuidv4 } = require("uuid");

const sendImage = async (contactId, image) => {
  const split = image.split(".");
  const imageType = split[split.length - 1];
  const media = await MessageMedia.fromUrl(image);
  media.mimetype = `image/${imageType}`;
  media.filename = `${uuidv4()}.${imageType}`;
  await whatsapp.client.sendMessage(contactId, media);
};

const sendWhatsappMessage = async (messageObject, GroupId) => {
  const type = messageObject.type;
  const message = messageObject.message;
  const image = messageObject.image;
  const personNumber = `${messageObject.personNumber}@c.us`;

  // if Group
  if (type == "group") {
    if (image) {
      await sendImage(personNumber);
      const sendMessage = await whatsapp.client.sendMessage(GroupId, message);
      return sendMessage;
    } else {
      const sendMessage = await whatsapp.client.sendMessage(GroupId, message);
      return sendMessage;
    }
  }

  // if personal Number
  if (type == "person") {
    if (image) {
      await sendImage(personNumber);
      const sendMessage = await whatsapp.client.sendMessage(
        personNumber,
        message
      );
      return sendMessage;
    } else {
      const sendMessage = await whatsapp.client.sendMessage(
        personNumber,
        message
      );
      return sendMessage;
    }
  }
};

module.exports = { sendWhatsappMessage };
