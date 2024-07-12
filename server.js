const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
let router = require("./app/routers/router.js");
const db = require("./app/config/db.config.js");
const env = require("./env.js");

const app = express();

db.sequelize.sync({ force: env.dropTable }).then(() => {
  console.log("Connected with postgres database!");
});

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", router);

// Create a Server
const server = app.listen(env.port, async function () {
  console.log(`Starting server at port:${env.port}`);
});
