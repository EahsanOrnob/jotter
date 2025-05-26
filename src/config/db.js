const mongoose = require("mongoose");
require("dotenv").config();

// connect to the Database ❤️
//Local server Database
database = process.env.DATABASE;

mongodb: mongoose.connect(database, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conntected to database 🤝"));
// db.close('close', () => console.log('Closing database connection 📕'));  have to close with logic 🧠

module.exports = db;