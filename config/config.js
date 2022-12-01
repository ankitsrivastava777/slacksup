var mongoose = require("mongoose");
const conn = mongoose.connect(
  `mongodb+srv://etech:java1234@cluster0.hubiwos.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
exports.module = db;