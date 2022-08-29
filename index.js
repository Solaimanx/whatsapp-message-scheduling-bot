if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { initDb } = require("./dbConnection");
const { checkScheduleExpried ,scheduleAllPending ,everyDayUpdateContactList} = require('./utils/schedule/scheduleUtils')
const routes = require("./routes");
const whatsapp = require("./whatsappWeb");


initDb();
// checkScheduleExpried()
// everyDayUpdateContactList()

// scheduleAllPending()
whatsapp.client.initialize();




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


console.log(process.env.FRONTEND_URL)


app.use(
  cors({
    origin: [process.env.FRONTEND_URL,'https://www.english21days.co.il','https://app.funnel-preview.com'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);

app.use("/", routes);
const httpServer = createServer(app);

const PORT = process.env.PORT || 4000;
httpServer.listen({ port: PORT }, () => {
  console.log(`server running on port ${PORT}`);
});
