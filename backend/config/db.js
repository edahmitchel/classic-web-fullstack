const mongoose = require("mongoose");

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error:${error.message}`);
  }
  //   process.exit();
};

module.exports = connection;
