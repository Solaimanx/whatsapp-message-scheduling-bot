const mongoose = require("mongoose");

 const initDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
    return db;
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

module.exports = { initDb };
