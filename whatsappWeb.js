const qrcode = require("qrcode-terminal");
const email = require("./utils/sendEmail");
const qrImage = require("qr-image");
const fs = require("fs");
const { Client, LocalAuth, LegacySessionAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox"],
  },
});

client.on("qr", async (qr) => {
  qrcode.generate(qr, { small: true });
  const svg_string = qrImage.imageSync(qr, { type: "png" });
  const convertIntobase64 = Buffer.from(svg_string).toString("base64");
  console.log(qr)

  // await email.sendEmail({
  //   subject: "Whatsapp Login QR",
  //   message: "Scan the qr code from attachments",
  //   file: convertIntobase64,
  // });
});

client.on("ready", async () => {
  console.log("whatsapp Web is ready! ");
});

// authentication
client.on("authenticated", (session) => {
  console.log(JSON.stringify(session));
});

client.on("auth_failure", async (msg) => {
  const message =
    "There is a problem to authenticate, Kindly set the env var again and restart the app ";
  await email.sendEmail({
    message,
    title: "Failed to Login into whatsapp on server",
  });
  console.error(
    "There is a problem to authenticate, Kindly set the env var again and restart the app"
  );
});

module.exports.client = client;
