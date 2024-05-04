const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/QuivIo");
  console.log("Mongo DB Conneted");
};

module.exports = dbConnect;
