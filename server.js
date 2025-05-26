
const app = require("./src/app");
const db = require("./src/config/db");

require("dotenv").config();


// connect to the Server 👌
let Port = process.env.port;
let Server = process.env.server;
app.listen(Port, () => {
  console.log(`Server started at ${Server}:${Port} 🎉`);
});
