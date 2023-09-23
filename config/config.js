const mongoose = require("mongoose");
require("colors");
require('dotenv').config()


const connectDB = () => {
  const url = process.env.MONGO_URI;
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).then(() => console.log(`Mongodb DataBase Connected! ${mongoose.connection.host}`.bgCyan.white))
    .catch((error) => {
      console.log(`error: ${error.message}`.bgRed.white)
      console.log("Database connection error");
      process.exit(1)
    })

};

module.exports = connectDB;
